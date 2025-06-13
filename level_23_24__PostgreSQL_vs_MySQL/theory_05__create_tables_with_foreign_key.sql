-- Удаляем предыдущую версию таблицы
DROP TABLE products;
-- DROP TABLE order_items;

-- Добавляем FOREIGN KEY в таблицу products
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    sku VARCHAR(50) UNIQUE,
    description TEXT,
    price NUMERIC(10, 2) CHECK (price > 0), -- Цена должна быть больше 0
    category_id INTEGER REFERENCES categories(category_id) -- Внешний ключ
);

-- Пример с CHECK (скидка не может быть больше цены)
CREATE TABLE order_items (
    order_item_id INTEGER PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER,
    price NUMERIC(10, 2),
    discount NUMERIC(10, 2),
    CHECK (discount <= price)
);


-- Выводим все таблицы текущей БД
SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog', 'information_schema');
