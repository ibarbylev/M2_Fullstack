## 1. UNION двух таблиц (без ALL, дубликаты удаляются)
```
SELECT 
    name, value
FROM
    bonuses 
UNION SELECT 
    name, value
FROM
    fines;

=== Результат ===

name    value
Alice   300
Bob     200
Charlie 100
```

`UNION` объединяет строки из обеих таблиц, но удаляет дубликаты.  
В точности, как DISTINCT удаляет полные дубликаты строк  
(для строк, где все значения строк одинаковы)



## 2. `UNION ALL` двух таблиц (с дубликатами)
```
SELECT 
    name, value
FROM
    bonuses 
UNION ALL SELECT 
    name, value
FROM
    fines;

=== Результат ===

name    value
Alice   300
Bob     200
Charlie 100
Bob     200
```

`UNION ALL` сохраняет все строки, включая дубликаты.  
Bob встречается дважды с разными значениями. 


## 3. INNER JOIN: Только пересечения
```
SELECT 
    b.name, 
    b.value AS bonus, 
    f.value AS fine
FROM
    bonuses AS b
        INNER JOIN
    fines AS f ON b.name = f.name;

=== Результат ===

name    bonus   fine
Bob     200     200
```

`INNER JOIN` показывает только тех, кто есть и в bonuses, и в fines. 
Bob есть в обеих таблицах.


## 4. `LEFT JOIN`: Все из bonuses (из левой таблица), только соответствия из fines (из правой)
```
SELECT 
    b.name, 
    b.value AS bonus, 
    f.value AS fine
FROM
    bonuses AS b
        LEFT JOIN
    fines AS f ON b.name = f.name;

=== Результат ===

name    bonus   fine
Alice   300     NULL
Bob     200     200
```

`LEFT JOIN` берёт все строки из bonuses.  
У Alice нет штрафа (NULL), а у Bob есть штраф 200.


## 5. RIGHT JOIN: Все из fines, соответствия из bonuses

```
SELECT 
    f.name, 
    b.value AS bonus, 
    f.value AS fine
FROM
    bonuses AS b
        RIGHT JOIN
    fines AS f ON b.name = f.name;

=== Результат ===

name    bonus   fine
Charlie NULL    100
Bob     200     200
```
`RIGHT JOIN` берёт все строки из fines.  
У Charlie нет бонуса (NULL), а у Bob есть.


## 6. `FULL OUTER JOIN` (эмулируем через UNION)
```
SELECT 
    b.name, 
    b.value AS bonus, 
    f.value AS fine
FROM
    bonuses AS b
        LEFT JOIN
    fines AS f ON b.name = f.name 
UNION SELECT 
    f.name, 
    b.value AS bonus, 
    f.value AS fine
FROM
    bonuses AS b
        RIGHT JOIN
    fines AS f ON b.name = f.name;

=== Результат ===

name    bonus   fine
Alice   300     NULL
Bob     200     200
Charlie NULL    100
```

`FULL OUTER JOIN` показывает абсолютно всех: 
- Alice без штрафа, 
- Charlie без бонуса, 
- Bob и со штрафом, и с бонусом.

## 7. `CROSS JOIN`

```
SELECT 
    b.name AS b_name, 
    b.value AS bonus, 
    f.name AS f_name, 
    f.value AS fine
FROM
    bonuses AS b
        CROSS JOIN
    fines AS f;
    

=== Результат ===

b_name  bonus   b_name   fine
Bob	    200	    Charlie  100
Alice	300	    Charlie  100
Bob	    200	    Bob	     200
Alice	300	    Bob	     200
```

`CROSS JOIN` — каждая строка из `bonuses` соединяется с каждой строкой из `fines`.  
Если в `bonuses` было бы 3 строки, а в fines было бы 2 строки,  
то получилось бы Декартово произведение всех строк: `3 × 2 = 6 строк.`