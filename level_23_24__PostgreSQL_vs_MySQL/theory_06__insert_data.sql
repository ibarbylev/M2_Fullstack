-- Используем таблицу categories, созданную ранее
-- category_id SERIAL PRIMARY KEY,
-- category_name VARCHAR(255) NOT NULL UNIQUE
-- Добавляем категории
INSERT INTO categories (category_name) VALUES ('Electronics'); -- category_id указывать не нужно!
INSERT INTO categories (category_name) VALUES ('Books');
INSERT INTO categories (category_name) VALUES ('Clothing');

-- Смотрим, что получилось
SELECT * FROM categories;

-- Добавляем товары в products (используя category_id)
INSERT INTO products (product_name, sku, price, category_id)
VALUES ('Laptop', 'LT-123', 1200.00, 1); -- category_id = 1 (Electronics)
INSERT INTO products (product_name, sku, price, category_id)
VALUES ('SQL for Beginners', 'BK-456', 29.99, 2); -- category_id = 2 (Books)
SELECT * FROM products;

-- Выводим все таблицы текущей БД
SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog', 'information_schema');
