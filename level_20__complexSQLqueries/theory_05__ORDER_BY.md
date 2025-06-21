#  ORDER BY

Оператор ORDER BY используется для сортировки результатов запроса по одному или нескольким столбцам.

```
SELECT column1, column2
FROM table_name
ORDER BY column1 [ASC | DESC], column2 [ASC | DESC];
```
    ASC (по умолчанию) — сортировка по возрастанию.
    DESC — сортировка по убыванию.

### Примеры 
#### Сортировка по одному столбцу
```
SELECT name, age FROM users ORDER BY age;
```
Сортирует по возрасту (по возрастанию).
```
SELECT name, age FROM users ORDER BY age DESC;
```
Сортирует по возрасту (по убыванию).

#### Сортировка по нескольким столбцам
```
SELECT name, age, city FROM users ORDER BY city ASC, age DESC;
```
Сначала сортирует по city (по алфавиту), а затем по age (по убыванию) в рамках каждого города.

