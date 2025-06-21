# Встроенные функции MySQL

| Категория функций                                                  | Описание                                                                                  |
|----------------------------------------------------------|-------------------------------------------------------------------------------------------|
| [**Строковые**](#строковые-функции)                                     | Работа со строками: изменение, извлечение, поиск, объединение и форматирование            |
| [**Числовые**](#числовые-функции)                                      | Математические операции и преобразования                                                  |
| [**Дата и время**](theory_05__date_time_fucntions.md)  | Работа с датой и временем: получение текущей даты, вычисления интервалов и форматирование |
| [**Системные**](#системные-функции)                                     | Информация о сервере, пользователях, базах данных и т.д.                                  |
| [**Функции JSON**](#json-функции)                                  | Работа с JSON-данными в MySQL                                                             |

# Строковые функции

## Изменение регистра

    LOWER(str) – переводит строку в нижний регистр.
    UPPER(str) – переводит строку в верхний регистр.

```
SELECT LOWER('HELLO'), UPPER('world'); -- hello, WORLD
```

## Удаление пробелов

    TRIM(str) – удаляет пробелы с обеих сторон строки.
    LTRIM(str) – удаляет пробелы слева.
    RTRIM(str) – удаляет пробелы справа.

```
SELECT TRIM('  hello  '), LTRIM('  hello'), RTRIM('hello  ');
-- 'hello', 'hello', 'hello'
```

## Объединение строк

    CONCAT(str1, str2, ...) – объединяет строки.
    CONCAT_WS(separator, str1, str2, ...) – объединяет строки с указанным разделителем.

```
SELECT CONCAT('Hello', ' ', 'World'); -- Hello World
SELECT CONCAT_WS('-', '2024', '03', '04'); -- 2024-03-04
```

## Длина строки

    LENGTH(str) – длина строки в байтах (важно для многобайтовых символов).
    CHAR_LENGTH(str) – длина строки в символах.

```
SELECT LENGTH('Привет'), CHAR_LENGTH('Привет'); -- 12, 6 (UTF-8)
```

## Извлечение части строки

    LEFT(str, N) – первые N символов строки.
    RIGHT(str, N) – последние N символов.
    SUBSTRING(str, pos, len) – извлекает подстроку начиная с pos длиной len.
    SUBSTR(str, pos, len) – аналог SUBSTRING.
    MID(str, pos, len) – аналог SUBSTRING.

```
SELECT LEFT('MySQL', 2), RIGHT('MySQL', 2), SUBSTRING('MySQL', 2, 3);
-- 'My', 'QL', 'ySQ'
```

## Поиск в строке

    LOCATE(substr, str, start_pos) – позиция substr в str.
    INSTR(str, substr) – аналог LOCATE, но без start_pos.
    POSITION(substr IN str) – аналог LOCATE.

```
SELECT LOCATE('SQL', 'MySQL'), INSTR('MySQL', 'SQL');
-- 3, 3
```

## Замена и удаление символов

    REPLACE(str, from_str, to_str) – заменяет from_str на to_str.
    REVERSE(str) – переворачивает строку.

```
SELECT REPLACE('Hello World', 'World', 'MySQL'), REVERSE('Hello');
-- 'Hello MySQL', 'olleH'
```

## Дополнение строки

    LPAD(str, len, padstr) – дополняет строку слева.
    RPAD(str, len, padstr) – дополняет справа.

```
SELECT LPAD('42', 5, '0'), RPAD('42', 5, '0');
-- '00042', '42000'
```
Дополнительная информация: [https://dev.mysql.com/doc/refman/8.4/en/string-functions.html](https://dev.mysql.com/doc/refman/8.4/en/string-functions.html)

***

# Числовые функции
Дополнительная информация: [https://dev.mysql.com/doc/refman/8.4/en/mathematical-functions.html](https://dev.mysql.com/doc/refman/8.4/en/mathematical-functions.html)



# Системные функции
Дополнительная информация: [https://dev.mysql.com/doc/refman/8.0/en/information-functions.html](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html)



# JSON функции

С версии 5.7+ MySQL поддерживает нативный тип данных JSON и предоставляет множество функций для:
- создания JSON-объектов
- доступа к элементам
- изменения и удаления данных
- проверки и валидации
- поиска по ключам

| Функция                  | Назначение                                                         | Пример использования                              |
|--------------------------|--------------------------------------------------------------------|----------------------------------------------------|
| `JSON_OBJECT()`          | Создаёт JSON-объект из пар ключ–значение                          | `JSON_OBJECT('name', 'John', 'age', 30)`           |
| `JSON_ARRAY()`           | Создаёт JSON-массив                                               | `JSON_ARRAY('apple', 'banana')`                    |
| `JSON_EXTRACT()`         | Извлекает данные по пути (аналог -> в PostgreSQL)                 | `JSON_EXTRACT(data, '$.name')`                     |
| `->` и `->>`             | Сокращённые операторы извлечения                                  | `data->'$.name'`, `data->>'$.name'`                |
| `JSON_SET()`             | Устанавливает/обновляет значение по пути                          | `JSON_SET(data, '$.name', 'Alice')`                |
| `JSON_REPLACE()`         | Заменяет значения по пути, если ключ существует                   | `JSON_REPLACE(data, '$.age', 25)`                  |
| `JSON_REMOVE()`          | Удаляет ключ/значение из JSON                                      | `JSON_REMOVE(data, '$.age')`                       |
| `JSON_INSERT()`          | Вставляет значение, если по пути ещё ничего нет                   | `JSON_INSERT(data, '$.city', 'Paris')`             |
| `JSON_KEYS()`            | Возвращает ключи объекта                                          | `JSON_KEYS(data)`                                  |
| `JSON_LENGTH()`          | Возвращает длину (число элементов) объекта или массива            | `JSON_LENGTH(data)`                                |
| `JSON_CONTAINS()`        | Проверяет, содержит ли JSON указанное значение                    | `JSON_CONTAINS(data, '30', '$.age')`               |
| `JSON_VALID()`           | Проверяет, является ли строка валидным JSON                       | `JSON_VALID('{ "a": 1 }')`                         |
| `JSON_TYPE()`            | Возвращает тип элемента по пути                                   | `JSON_TYPE(data, '$.age')`                         |
| `JSON_MERGE_PRESERVE()`  | Объединяет несколько JSON-объектов (с сохранением повторов)       | `JSON_MERGE_PRESERVE(json1, json2)`                |
| `JSON_UNQUOTE()`         | Удаляет кавычки с JSON-строки                                     | `JSON_UNQUOTE('"hello"')`                          |


Например:
```
SELECT JSON_EXTRACT('{"name": "John", "age": 30}', '$.name') AS name;               -- "John"
SELECT JSON_UNQUOTE(JSON_EXTRACT('{"name": "John"}', '$.name')) AS name_unquoted;   -- John

```

Дополнительная информация: [https://dev.mysql.com/doc/refman/8.4/en/json-functions.html](https://dev.mysql.com/doc/refman/8.4/en/json-functions.html)