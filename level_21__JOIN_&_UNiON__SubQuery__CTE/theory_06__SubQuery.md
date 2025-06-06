# Подзапросы (SubQuery) в MySQL:

**Подзапрос** — это SQL-запрос, вложенный внутрь другого SQL-запроса. 

Он может использоваться в операторе `SELECT`, `INSERT`, `UPDATE` или `DELETE`, а также в выражениях `WHERE`, `FROM` и `HAVING`.

Пример подзапроса:
```
SELECT name
FROM employees
WHERE department_id = (
    SELECT id
    FROM departments
    WHERE name = 'Sales'
);
```
В этом примере подзапрос сначала находит id отдела `Sales`, а затем внешний запрос ищет всех сотрудников этого отдела.

## Где можно использовать подзапросы (SubQuery)?

| Место использования | Пример                                                                                                                                                                     | Описание |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| SELECT              | `SELECT name, salary, (SELECT AVG(salary) FROM employes) AS avg_salary FROM employees;`                                                                                    | Подзапрос возвращает скалярное значение, используется как поле в SELECT. |
| FROM                | `SELECT * FROM (SELECT * FROM orders WHERE amount > 100) AS t_big_orders;`                                                                                                 | Подзапрос используется как временная таблица. Требуется псевдоним. |
| WHERE               | `SELECT name, salary FROM employes WHERE employes > (SELECT AVG(salary) FROM employes);`                                                                                          | Подзапрос используется как фильтр — одно из самых распространённых применений. |
| HAVING              | `SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id HAVING COUNT(*) > (SELECT AVG(cnt) FROM (SELECT COUNT(*) AS cnt FROM orders GROUP BY customer_id) AS sub);` | Подзапрос используется для фильтрации агрегатных значений. |


## 📦 Градация подзапросов по возвращаемому значению

| Тип подзапроса        | Описание                                             | Где применяется               |
|------------------------|------------------------------------------------------|-------------------------------|
| Скалярный              | Возвращает одно значение                             | `SELECT`, `WHERE`, `HAVING`   |
| Список значений        | Один столбец (массив)                                | `IN`, `NOT IN`                |
| Множественные значения | Несколько столбцов и строк, сравниваются как кортежи | `WHERE (col1, col2) IN (...)` |
| Табличный              | Полноценная таблица, используется как временная      | `FROM`, `JOIN`, `WITH`        |

### Примеры 
#### 🟩 Скалярный подзапрос
```
SELECT name
FROM customers
WHERE id = (
    SELECT MIN(id)
    FROM customers
);
```

#### 🟦 Список значений
```
SELECT name
FROM customers
WHERE id IN (
    SELECT customer_id
    FROM orders
);
```

#### 🟨 Множественные значения
```
SELECT *
FROM employees
WHERE (department_id, job_title) IN (
    SELECT dept_id, title
    FROM department_roles
);
```

#### 🟪 Табличный подзапрос
```
SELECT d.name, COUNT(*) AS employee_count
FROM (
    SELECT * FROM employees
    WHERE hired_date >= '2020-01-01'
) AS recent_hires
JOIN departments d ON recent_hires.department_id = d.id
GROUP BY d.name;
```

## ✅ Плюсы подзапросов

| Плюс                 | Объяснение |
|----------------------|------------|
| Читаемость           | Упрощает структуру запроса, особенно при вложенной логике. |
| Инкапсуляция         | Изолирует отдельную часть логики в виде "чёрного ящика". |
| Гибкость             | Позволяет выполнять динамические вычисления и фильтрацию. |
| Без временных таблиц | Не требует отдельного представления или временной таблицы. |

## ❌ Минусы подзапросов

| Минус                        | Объяснение |
|-----------------------------|------------|
| Медленнее JOIN              | Часто `JOIN` работает быстрее, особенно при наличии индексов. |
| Коррелированные подзапросы | Выполняются для каждой строки внешнего запроса — это дорого по ресурсам. |
| Плохо читаемые вложенности | Сложные подзапросы трудны для отладки и понимания. |
| Ограничения MySQL           | В некоторых случаях MySQL накладывает ограничения на использование подзапросов (особенно в старых версиях). |

