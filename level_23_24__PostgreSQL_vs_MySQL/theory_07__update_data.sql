-- Увеличиваем цену Laptop на 10%
UPDATE products
SET price = price * 1.10
WHERE product_name = 'Laptop';

-- Проверяем категории ДО изменений
SELECT * FROM categories;

-- Меняем категорию для товара 'SQL for Beginners' на 'Programming' (сначала добавим такую категорию)
INSERT INTO categories (category_name) VALUES ('Programming');

-- Проверяем категории ПОСЛЕ изменений
SELECT * FROM categories;



-- ==================== ОБНОВЛЯЕМ category_id в таблице ПРОДУКТЫ ===========================
-- Проверяем продукты ДО изменений
SELECT * FROM products;

-- Обновление с подзапросом
UPDATE products
SET category_id = (SELECT category_id FROM categories WHERE category_name = 'Programming')
WHERE product_name = 'SQL for Beginners';

-- Проверяем продукты ПОСЛЕ изменений
SELECT * FROM products;
