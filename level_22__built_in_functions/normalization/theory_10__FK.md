Строго говоря, в MySQL есть только 2 связи: one-to-one и one-to-many. 

## Когда используется связь one-to-one (один к одному)?

Следует помнить, что основная идея SQL реализация системы Сущность-Связь (Entity-Relationship).
Поэтому разнесение данных Person-Passport по разным таблицам, соединённым связью *one-to-one*, -
это, в первую очередь, следование правилам нормализации (каждой сущности - своя отдельная таблица).

Разница между one-to-many и one-to-one только в дополнительном ограничении на
уникальность поля FK.

Пример one-to-one 
(точнее one_to_zero_or_one: поскольку допустимы значения NULL у FK, 
то связь по FK в этом примере не обязательна) 

```
DROP DATABASE IF EXISTS one_to_zero_or_one;
CREATE DATABASE one_to_zero_or_one;
USE one_to_zero_or_one;


CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL
);


CREATE TABLE passports (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    bio TEXT,
    user_id INT UNIQUE,         -- Ограничение на уникальность внешнего ключа
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Добавление данных в таблицу users
INSERT INTO `users` (`username`) VALUES
('Alice'),
('Bob'),
('Mike'),
('Ann');

-- Добавление данных в таблицу passports
INSERT INTO `passports` (`bio`, `user_id`) VALUES
('Bio for Alice', 1),
('Bio for Bob', 2),
('Bio for Ann', 4);

-- Попытка вставить данные, чтобы проверить связь 1:0
-- Добавление записи без указания ключа не таблицу users
INSERT INTO `passports` (`bio`, `user_id`) VALUES
('Bio for NULL', NULL);

-- Попытка вставить данные, чтобы проверить связь 1:1
-- Следующий запрос вызвает ошибку из-за ограничения уникальности внешнего ключа
INSERT INTO `passports` (`bio`, `user_id`) VALUES
('Duplicate Bio for Alice', 1);


```
Немного изменяем (ужесточаем) требования к полю user_id в таблице passport:
теперь этот ключ должен быть не только уникальным, но и не NULL.
То есть получаем пример классической связи one-to-one

```
DROP DATABASE IF EXISTS strictly_one_to_one;
CREATE DATABASE strictly_one_to_one;
USE strictly_one_to_one;


CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL
);


CREATE TABLE passports (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    bio TEXT,
    user_id INT UNIQUE NOT NULL,         -- Ограничение на уникальность внешнего ключа
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Добавление данных в таблицу users
INSERT INTO `users` (`username`) VALUES
('Alice'),
('Bob'),
('Mike'),
('Ann');

-- Добавление данных в таблицу passports
INSERT INTO `passports` (`bio`, `user_id`) VALUES
('Bio for Alice', 1),
('Bio for Bob', 2),
('Bio for Ann', 4);

-- Попытка вставить данные, чтобы проверить связь 1:0
-- Теперь попытка добавить запись без указания ключа не таблицу users вызовет ошибку
INSERT INTO `passports` (`bio`, `user_id`) VALUES
('Bio for NULL', NULL);


-- Попытка вставить данные, чтобы проверить связь 1:1
-- Следующий запрос вызвает ошибку из-за ограничения уникальности внешнего ключа
INSERT INTO `passports` (`bio`, `user_id`) VALUES
('Duplicate Bio for Alice', 1);
```

## Пример связи one-to-many (один ко многим)?

Здесь снова всё отличие в ограничениях к полю user_id в таблице passport.
Достаточно просто убрать требование уникальность и мы получим
one-to-many (или one-to-zero-or-many)

```
DROP DATABASE IF EXISTS strictly_one_to_one;
CREATE DATABASE strictly_one_to_one;
USE strictly_one_to_one;


CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL
);


CREATE TABLE passports (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    bio TEXT,
    user_id INT UNIQUE NOT NULL,         -- Ограничение на уникальность внешнего ключа
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Добавление данных в таблицу users
INSERT INTO `users` (`username`) VALUES
('Alice'),
('Bob'),
('Mike'),
('Ann');

-- Добавление данных в таблицу passports
INSERT INTO `passports` (`bio`, `user_id`) VALUES
('Bio for Alice', 1),
('Bio for Bob', 2),
('Bio for Ann', 4);

-- Попытка вставить данные, чтобы проверить связь 1:0
-- Теперь попытка добавить запись без указания ключа не таблицу users вызовет ошибку
INSERT INTO `passports` (`bio`, `user_id`) VALUES
('Bio for NULL', NULL);


-- Попытка вставить данные, чтобы проверить связь 1:1
-- Следующий запрос вызвает ошибку из-за ограничения уникальности внешнего ключа
INSERT INTO `passports` (`bio`, `user_id`) VALUES
('Duplicate Bio for Alice', 1);
```

https://stackoverflow.com/questions/13644979/mysql-one-to-one-relationship