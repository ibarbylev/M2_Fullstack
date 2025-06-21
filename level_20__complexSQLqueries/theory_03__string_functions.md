# Строковые функции для работы с текстом

## Изменение регистра

    LOWER(str) – переводит строку в нижний регистр.
    UPPER(str) – переводит строку в верхний регистр.

```
SELECT LOWER('HELLO'), UPPER('world'); -- hello, WORLD
```

## Удаление пробелов

    TRIM(str) – удаляет пробелы с обеих сторон строки.
    LTRIM(str) – удаляет пробелы слева.
    RTRIM(str) – удаляет пробелы справа.

```
SELECT TRIM('  hello  '), LTRIM('  hello'), RTRIM('hello  ');
-- 'hello', 'hello', 'hello'
```

## Объединение строк

    CONCAT(str1, str2, ...) – объединяет строки.
    CONCAT_WS(separator, str1, str2, ...) – объединяет строки с указанным разделителем.

```
SELECT CONCAT('Hello', ' ', 'World'); -- Hello World
SELECT CONCAT_WS('-', '2024', '03', '04'); -- 2024-03-04
```

## Длина строки

    LENGTH(str) – длина строки в байтах (важно для многобайтовых символов).
    CHAR_LENGTH(str) – длина строки в символах.

```
SELECT LENGTH('Привет'), CHAR_LENGTH('Привет'); -- 12, 6 (UTF-8)
```

## Извлечение части строки

    LEFT(str, N) – первые N символов строки.
    RIGHT(str, N) – последние N символов.
    SUBSTRING(str, pos, len) – извлекает подстроку начиная с pos длиной len.
    SUBSTR(str, pos, len) – аналог SUBSTRING.
    MID(str, pos, len) – аналог SUBSTRING.

```
SELECT LEFT('MySQL', 2), RIGHT('MySQL', 2), SUBSTRING('MySQL', 2, 3);
-- 'My', 'QL', 'ySQ'
```

## Поиск в строке

    LOCATE(substr, str, start_pos) – позиция substr в str.
    INSTR(str, substr) – аналог LOCATE, но без start_pos.
    POSITION(substr IN str) – аналог LOCATE.

```
SELECT LOCATE('SQL', 'MySQL'), INSTR('MySQL', 'SQL');
-- 3, 3
```

## Замена и удаление символов

    REPLACE(str, from_str, to_str) – заменяет from_str на to_str.
    REVERSE(str) – переворачивает строку.

```
SELECT REPLACE('Hello World', 'World', 'MySQL'), REVERSE('Hello');
-- 'Hello MySQL', 'olleH'
```

## Дополнение строки

    LPAD(str, len, padstr) – дополняет строку слева.
    RPAD(str, len, padstr) – дополняет справа.

```
SELECT LPAD('42', 5, '0'), RPAD('42', 5, '0');
-- '00042', '42000'
```
Это основные строковые функции MySQL.