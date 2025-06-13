CREATE TABLE products (
	product_id INTEGER PRIMARY KEY, -- Первичный ключ (уникальный и NOT NULL)
	product_name VARCHAR(255) NOT NULL,
	sku VARCHAR(50) UNIQUE, -- Артикул (должен быть уникальным)
	description TEXT,
	price NUMERIC(10, 2)
);


-- Таблица categories с автоинкрементным первичным ключом (SERIAL)
CREATE TABLE categories (
	category_id SERIAL PRIMARY KEY, -- SERIAL
	category_name VARCHAR(255) NOT NULL UNIQUE
);


-- Выводим все таблицы текущей БД
SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog', 'information_schema');
