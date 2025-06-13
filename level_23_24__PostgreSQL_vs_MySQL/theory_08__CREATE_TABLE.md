# Создание таблиц в PostgreSQL и MySQL

## 1. Общие принципы

Обе СУБД используют SQL для определения структуры таблиц с помощью команды `CREATE TABLE`.

**Основные элементы:**
- Имена таблиц и столбцов
- Типы данных
- Ограничения (constraints)
- Первичный ключ (PRIMARY KEY)
- Внешний ключ (FOREIGN KEY)
- Значения по умолчанию (DEFAULT)
- Уникальные значения (UNIQUE)
- Проверка значений (CHECK)

---

## 2. Теория: Синтаксис CREATE TABLE

```
CREATE TABLE имя_таблицы (
    имя_столбца тип_данных [ограничения],
    ...
);
```

### Пример PostgreSQL
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    age INTEGER CHECK (age >= 18)
);
```

### Пример MySQL
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    age INT CHECK (age >= 18)
);
```

Возможности PostgreSQL по типам данным и проверкам ограничений больше, чем в MySQL.
И могут быть увеличены за счёт установки расширений.