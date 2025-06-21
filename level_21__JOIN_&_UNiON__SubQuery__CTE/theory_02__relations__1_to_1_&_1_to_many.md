# Связи между таблицами Один-к-Одному (`1-TO-1`) и Один-ко-Многим (`1-TO-MANY`)

## 1-TO-1 (Один к одному)

В этой связи каждая запись одной таблицы соответствует ровно одной записи другой таблицы.

Пример: *таблицы users и passports, где у каждого пользователя есть только один паспорт.*
```
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE passports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,  -- Связь один к одному
    passport_number VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```
- `UNIQUE` на `user_id` гарантирует, что у пользователя может быть только один паспорт.
- `ON DELETE CASCADE` удалит паспорт, если удалён пользователь.

## 1-TO-MANY (Один ко многим)

В этой связи одна запись в первой таблице может соответствовать нескольким записям во второй таблице.

Пример: *таблицы users и orders, где один пользователь может сделать много заказов.*
```
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,  -- Связь один ко многим
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```

В случае связи Один-ко-Многим, один пользователь может иметь много заказов.
