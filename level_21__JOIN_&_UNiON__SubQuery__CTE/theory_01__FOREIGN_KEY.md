# Можно ли обойтись без `FOREIGN KEY`?

## Можно легко прожить и без `FOREIGN KEY`

Создадим две таблицы, продукты и заказы:

```
CREATE TABLE goods (
    id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    quantity INT NOT NULL,
    product_id INT -- Внешний ключ добавим позже
);
```

Добавляем данные:
```
INSERT INTO goods (id, name) VALUES (1, 'Телефон'),;

INSERT INTO orders (id, quantity, product_id) VALUES 
(1, 5, 1), -- 5 телефонов
(2, 2, 2); -- 2 ноутбука
```
Здесь пока нет `FOREIGN KEY`, поэтому можно вставлять любые `product_id`, даже если их нет в `goods`.
Что очевидно представляет собой ОГРОМНУЮ проблему: при попытке подставить в таблицу `orders` значение товара, мы получим ссылку на несуществующий товар. 
То есть ошибку.

## Пример с FK (ограничение на добавление)

Удалим текущую версию таблицы `orders` и создадим новую:
```
CREATE TABLE orders (
    id INT PRIMARY KEY,
    quantity INT NOT NULL,
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES goods(id)
);
```

Теперь между таблицам установлена однозначная связь: в `product_id` мы больше не можем вставить любой индекс, который взбредёт нам в голову.
Ибо попытка вставить ссылку на несуществующий индекс в таблице `goods` вызовет запрет системы на эту вставку.

```
INSERT INTO orders (id, quantity, product_id) VALUES 
(1, 5, 1), -- 5 телефонов
(2, 2, 2); -- 2 ноутбука

ERROR: Cannot add or update a child row: a foreign key constraint fails.
```

Что совершенно логично: прежде чем начать продавать ноутбуки, их следует добавить в таблицу `goods`:
```
INSERT INTO goods (id, name) VALUES (2, 'Ноутбук');
```

После этого заказы и индексом 2 (ноутбук) добавятся в таблицу `orders` без каких-либо проблем:
```
INSERT INTO orders (id, quantity, product_id) VALUES 
(1, 5, 1), -- 5 телефонов
(2, 2, 2); -- 2 ноутбука
```

Более полную информацию об "иностранных ключах" можно получить из официального руководства: https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html

Здесь же отметим только три момента:

### 1. Надо ли давать собственные имена ограничениям?

Ограничения вообще, и ограничение `FOREIGN KEY` в частности, есть смысл сразу же добавлять под его собственным именем. Например: `fk_orders_goods`.

```
CREATE TABLE orders (
    id INT PRIMARY KEY,
    quantity INT NOT NULL,
    product_id INT,
    CONSTRAINT fk_orders_goods FOREIGN KEY (product_id) REFERENCES goods(id)
);
```

Зачем?
Эту упростит удаление / изменение `FOREIGN KEY` в будущем, если возникнет такая необходимость.


### 2. Добавление инструкций `ON DELETE / ON UPDATE`

Если ноутбуки из таблицы `goods` удалятся, то это нарушит целостность таблицы заказов: заказы снова начнут содержать индексы (ссылки) на несуществующие позиции.

Чтобы этого не произошло, мы должны 
- либо запретить удаление продуктов,  
- либо удалять продукт одновременно вмести со всеми заказами, где он использовался,
- либо заменять удалённый продукт чем-то другим.

Как стратегии лучше выбрать полностью зависит от конкретной ситуации.
Вот несколько примеров на основные случаи жизни.

Варианты:
| Вариант              | Описание |
|----------------------|----------|
| `ON DELETE CASCADE`  | При удалении родительской записи удаляются все дочерние. |
| `ON DELETE SET NULL` | При удалении родителя `product_id`/`customer_id` в `orders` становится `NULL`. |
| `ON DELETE RESTRICT` | **(По умолчанию).** Если в `orders` есть записи, удаление `goods`/`customers` запрещено. |
| `ON DELETE NO ACTION` | Как `RESTRICT`, но поведение зависит от движка БД. |
| `ON UPDATE CASCADE`  | При изменении `id` в `goods`/`customers` он автоматически обновляется в `orders`. |
| `ON UPDATE SET NULL` | Если `id` изменился в `goods`/`customers`, в `orders` становится `NULL`. |

Пример использования:
```
CREATE TABLE orders (
    id INT PRIMARY KEY,
    quantity INT NOT NULL,
    product_id INT,
    customer_id INT,
    CONSTRAINT fk_orders_goods FOREIGN KEY (product_id) REFERENCES goods(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
    );
```

#### Что даёт добавление `CASCADE`, `SET NULL` или `RESTRICT`?

    CASCADE — если удаляется товар, удаляем все заказы на него.
    SET NULL — если клиент удалён, заказы остаются, но без привязки.
    RESTRICT / NO ACTION — чтобы нельзя случайно удалить или изменить важные данные.

Подробности и дополнения снова здесь: https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html


##  Как посмотреть на структуру существующей таблицы?

#### 1. Нажать на таблицу в схемах Workbench и посмотреть под схемами
```
Table: orders

Columns:
	id	int PK
	quantity	int
	product_id	int
```

#### 2. `DESCRIBE table_name`;

```
# Field     Type    Null    Key     Default     Extra
id	        int	    NO	    PRI		
quantity	int	    NO			
product_id	int	    YES	    MUL	
```

#### 3. `SHOW CREATE TABLE table_name`;

```
CREATE TABLE `orders` (
  `id` int NOT NULL,
  `quantity` int NOT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `goods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```