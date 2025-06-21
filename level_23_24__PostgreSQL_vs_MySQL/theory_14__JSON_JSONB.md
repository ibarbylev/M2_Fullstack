# JSON / JSONB тип данных в PostgreSQL

## 🧱 1. Создание и заполнение тестовой таблицы для пояснения

```sql
CREATE TABLE training_json (
    id SERIAL PRIMARY KEY,
    info JSONB  -- можно заменить на JSON
);

INSERT INTO training_json (info) VALUES
('{"name": "Alice", "age": 30, "emails": ["alice@example.com", "alice@gmail.com"]}'),
('{"name": "Bob", "age": 25, "emails": ["bob@example.com"], "address": {"city": "Sofia", "zip": "1000"}}'),
('{"name": "Charlie", "emails": ["charlie@abc.com", "c@xyz.com"]}');
```

---

## 📋 2. Основные операторы и функции PostgreSQL для JSON / JSONB

### 🔹 **Операторы доступа и извлечения**


| Оператор    | Описание                             | Возвращает | Пример                                                                 | Результат                         |
|-------------|--------------------------------------|------------|------------------------------------------------------------------------|-----------------------------------|
| `->`        | Доступ к полю                        | `JSON`     | `SELECT info -> 'name' FROM training_json WHERE id = 1;`               | `"Alice"`                         |
| `->>`       | Доступ к полю и извлечение текста    | `TEXT`     | `SELECT info ->> 'name' FROM training_json WHERE id = 1;`              | `Alice`                           |
| `#>>`       | Доступ к вложенным полям как текст   | `TEXT`     | `SELECT info #>> '{address,city}' FROM training_json WHERE id = 2;`    | `Sofia`                           |
| `#>`        | Доступ к вложенным полям как JSON    | `JSON`     | `SELECT info #> '{address}' FROM training_json WHERE id = 2;`          | `{"city":"Sofia","zip":"1000"}`  |
| `-> index`  | Элемент массива по индексу           | `JSON`     | `SELECT info -> 'emails' -> 0 FROM training_json WHERE id = 1;`        | `"alice@example.com"`            |
| `->> index` | Элемент массива по индексу как текст | `TEXT`     | `SELECT info -> 'emails' ->> 0 FROM training_json WHERE id = 1;`       | `alice@example.com`              |

---
### 🔹 **Операторы поиска, изменения и удаления в JSONB**

| Оператор | Что делает                                | Пример                             | Результат                        |
|----------|-------------------------------------------|------------------------------------|----------------------------------|
| `@>`     | JSONB слева **содержит** JSONB справа     | `info @> '{"name": "Alice"}'`      | `true`, если есть такое поле     |
| `<@`     | JSONB слева **содержится в** JSONB справа | `info <@ '{"name": "Alice", "age": 30}'` | `true`                    |
| `?`      | Есть ли ключ                              | `info ? 'name'`                    | `true`, если ключ есть           |
| `?\|`    | Есть ли **любой** из ключей               | `info ?\| array['zip', 'age']`     | `true`, если хотя бы один есть  |
| `?&`     | Есть ли **все** указанные ключи           | `info ?& array['age', 'name']`     | `true`, если оба есть           |
| `\|\|`   | Конкатенация двух JSONB                   | `info \|\| '{"city": "Paris"}'`    | Добавляет или заменяет поля     |
| `-`      | Удаление ключа или элемента массива       | `info - 'age'`<br>`arr - 1`        | Удаляет ключ/элемент            |
| `#-`     | Удаление по пути                          | `info #- '{address,zip}'`          | Удаляет поле по вложенному пути |

---


### 🔹 **Полезные JSONB-функции**

| Функция                             | Описание                        | Пример                                                      | Результат               |
| ----------------------------------- |---------------------------------| ----------------------------------------------------------- | ----------------------- |
| `jsonb_typeof(jsonb)`               | Возвращает тип элемента JSON    | `SELECT jsonb_typeof(info -> 'emails') FROM training_json;`         | `array`                 |
| `jsonb_array_elements(jsonb)`       | Разворачивает массив JSON       | `SELECT jsonb_array_elements(info -> 'emails') FROM training_json;` | список email'ов         |
| `jsonb_object_keys(jsonb)`          | Возвращает ключи объекта        | `SELECT jsonb_object_keys(info) FROM training_json;`                | `name`, `age`, `emails` |
| `jsonb_build_object(key, val, ...)` | Создать JSON-объект             | `SELECT jsonb_build_object('x', 1, 'y', 2);`                | `{"x": 1, "y": 2}`      |
| `jsonb_set(target, path, value)`    | Изменение / добавление значения | `jsonb_set(info, '{age}', '35')`                            | обновит поле `age`      |

---

## 🧪 3. Примеры запросов

### ➤ Получить значение в JSON-объекте по ключу :
(имя пользователя по первому id)
```sql
SELECT info -> 'name' FROM training_json WHERE id = 1;  -- "Alice"
SELECT info ->> 'name' FROM training_json WHERE id = 1;  -- Alice
```

Существенное отличие: первый запрос возвращает JSON-данные, которые НЕЛЬЗЯ использовать как строки. 
Поэтому в следующем примере первый запрос даст ошибку, а второй - результат запроса:
```sql
SELECT * FROM training_json WHERE info -> 'name' = 'Ivan'; 
-- Вернёт ошибку
SELECT * FROM training_json WHERE info ->> 'name' = 'Ivan'; 
-- {"age": 30, "name": "Alice", "emails": ["alice@example.com", "alice@gmail.com"]}
```

### ➤ Получить значение в JSON-объекте по ключу во вложенном JSON-объекта:

Внутри одного запроса можно также сделать и цепочку извлечений:  
```sql
SELECT info -> 'address' -> 'city' FROM training_json WHERE id = 2;  -- "Sofia"
```

Но гораздо проще использовать для этого готовый оператор пути:
```sql
SELECT info #> '{address,city}' FROM training_json WHERE id = 2;  -- "Sofia"
```

А ещё лучше вместо JSON-объекта получить готовый текст:
```sql
SELECT info #>> '{address,city}' FROM training_json WHERE id = 2;  -- Sofia
```

### ➤ Извлечение элемента массива по индексу:

```sql
SELECT info -> 'emails' -> 0 FROM training_json WHERE id = 1;  -- "alice@example.com" (как JSON-объект)

SELECT info -> 'emails' ->> 0 FROM training_json WHERE id = 1;  -- alice@example.com  (как текст)

-- Извлечение элемента массива с помощью функции
SELECT jsonb_array_elements_text(info -> 'emails') FROM training_json WHERE id = 1; -- alice@example.com
```

---

### ➤ Фильтрация по ключу в поле JSON
Ищем пользователей, у которых есть указан возраст (имеется ключ `age`) :

```sql
SELECT info ->> 'name'
FROM training_json
WHERE info ? 'age';    -- Alice, Bob
```

Ищем пользователей, у которых есть указан либо 'zip', либо 'age':

```sql
SELECT info ->> 'name'
FROM training_json
WHERE info ?| array['zip', 'age'];  -- Bob
```

Ищем пользователей, у которых есть указан ОДНОВРЕМЕННО и 'name', и 'age':

```sql
SELECT info ->> 'name'
FROM training_json
WHERE info ?& array['name', 'age'];  --  -- Alice, Bob
```
---

### ➤ Поиск по части JSON
Фильтрация по пользователям, чьи email'ы содержат `bob@example.com`:

```sql
SELECT info ->> 'name'
FROM training_json
WHERE info @> '{"emails": ["bob@example.com"]}';  
```

---

### ➤ Все email'ы, по одному в строке:

```sql
SELECT info ->> 'name' AS user, jsonb_array_elements_text(info -> 'emails') AS email
FROM training_json
WHERE info ? 'emails';
```

📌 Результат:

```
Alice     alice@example.com
Alice     alice@gmail.com
Bob       bob@example.com
Charlie   charlie@abc.com
Charlie   c@xyz.com
```
---

### ➤ Добавим новое поле "status": "active" с помощью конкатенации:
```sql
SELECT info || '{"status": "active"}'
FROM training_json
WHERE info ->> 'name' = 'Charlie';  -- добавляет поле "status"
```
---

### ➤ Удалим ключ age из JSONB (удаление по ключу):
```sql
SELECT info - 'age'
FROM training_json
WHERE info ? 'age';  -- Alice, Bob — поле "age" будет удалено
```

---

### ➤ Удалим вложенное поле zip по пути address → zip:
```sql
SELECT info #- '{address, zip}'
FROM training_json
WHERE info -> 'address' IS NOT NULL;  -- только Bob — удаляется "zip"
```

---



## ✅ Вывод

| Категория          | Основные инструменты                                                     | 
| ------------------ |--------------------------------------------------------------------------|
| Доступ к данным    | `->`, `->>`, `#>`, `#>>`, индексы массива                                |
| Поиск по структуре | `@>`, `<@`, `?`, `?\|`, `?&`                                             |
| Обработка JSON     | `jsonb_array_elements`, `jsonb_object_keys`, `jsonb_set`, `jsonb_typeof` |
| Создание JSON      | `jsonb_build_object`, `jsonb_build_array`                                |

