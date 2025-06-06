# Подготовка данных для пояснения вертикального (UNION) и горизонтального (JOIN) объединения таблиц


## 1. Создаём базу данных
```
-- DROP DATABASE company_db;

CREATE DATABASE IF not EXISTS company_db;
USE company_db;
```

## 2. Создаём две таблицы
```
CREATE TABLE IF NOT EXISTS bonuses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    value INT
);

CREATE TABLE IF NOT EXISTS fines (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    value INT
);
```


##  3. Заполняем таблицы данными (cовпадение только по 'Bob')
```
INSERT INTO bonuses (name, value) VALUES ('Alice', 300), ('Bob', 200);
INSERT INTO fines (name, value) VALUES ('Charlie', 100), ('Bob', 200); 


SELECT * FROM bonuses;

name    value
Alice   300
Bob     200


SELECT * FROM fines;

name    value
Charlie 100
Bob     200

```