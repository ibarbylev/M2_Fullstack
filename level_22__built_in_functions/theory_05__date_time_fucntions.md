# Описание функций для работы с датами и временем в MySQL:

## NOW()
Возвращает текущие дату и время в формате YYYY-MM-DD HH:MM:SS.
Пример:
```
SELECT NOW() AS CurrentDateTime;
```
Результат: 2025-03-12 14:30:45

## CURDATE() / CURRENT_DATE()
Возвращает текущую дату без времени в формате YYYY-MM-DD.
Пример:
```
SELECT CURDATE() AS CurrentDate;
```
Результат: 2025-03-12

## CURTIME() / CURRENT_TIME()
Возвращает текущее время без даты в формате HH:MM:SS.
Пример:
```
SELECT CURTIME() AS CurrentTime;
```
Результат: 14:30:45

## DATE_FORMAT(date, format)
Форматирует дату по заданному шаблону.
https://dev.mysql.com/doc/refman/8.4/en/date-and-time-functions.html#function_date-format
Пример:
```
SELECT DATE_FORMAT(NOW(), '%d-%m-%Y %H:%i:%s') AS FormattedDateTime;
```
Результат: 12-03-2025 14:30:45

## DATEDIFF(date1, date2)
Вычисляет разницу в днях между двумя датами.
Пример:
```
SELECT DATEDIFF('2024-08-30', '2024-08-25') AS DaysDifference;
```
Результат: 5

## DATE_ADD(date, INTERVAL value unit)
Прибавляет указанный интервал к дате.
Пример:
```
SELECT DATE_ADD(NOW(), INTERVAL 10 DAY) AS FutureDate;
```
Результат: 2025-03-22 14:30:45

## DAYNAME();
Возвращает имя дня недели на языке, установленном на сервере.
Пример:
```
DAYNAME(NOW());
```
Результат: Thursday

Язык сервера можно изменить с помощью `SET lc_time_names = 'ru_RU';`
Пример:
```
SET lc_time_names = 'ru_RU';
DAYNAME(NOW());
```
Результат: Четверг

## DATE_SUB(date, INTERVAL value unit)
Вычитает интервал из даты.
Пример:
```
SELECT DATE_SUB(NOW(), INTERVAL 10 DAY) AS PastDate;
```
Результат: 2025-03-02 14:30:45

## EXTRACT(unit FROM date)
Извлекает указанную часть даты (год, месяц, день и т. д.).
Пример:
```
SELECT EXTRACT(YEAR FROM NOW()) AS CurrentYear;
```
Результат: 2025

## TIMESTAMPDIFF(unit, datetime1, datetime2)
Универсальная функция, изменяющая интервал времени в указанных величинах, где
`unit` — единица измерения разницы (`SECOND`, `MINUTE`, `HOUR`, `DAY`, `MONTH`, `YEAR` и т. д.).
Пример:
```
SELECT TIMESTAMPDIFF(DAY, '1991-10-25', '2020-01-01');
```
Результат: 10295

## TIME_TO_SEC(time)
Преобразует время в количество секунд с начала дня.
Пример:
```
SELECT TIME_TO_SEC('02:30:00') AS Seconds;
```
Результат: 9000

## SEC_TO_TIME(seconds)
Преобразует количество секунд в формат времени HH:MM:SS.
Пример:
```
SELECT SEC_TO_TIME(9000) AS TimeFormat;
```
Результат: 02:30:00

## STR_TO_DATE(str)
Преобразует дату в формате строки в дату в формате даты
Пример:
```
SELECT STR_TO_DATE('11-03-2025', '%d-%m-%Y') AS ConvertedDate;
```
Результат: 2025-03-11


Дополнительная информация: https://dev.mysql.com/doc/refman/8.4/en/date-and-time-functions.html