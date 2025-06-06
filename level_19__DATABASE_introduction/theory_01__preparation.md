# Подготовка для работе с Базами Данных

Изучать БД без практики - всё равное что учиться играть без гитары и нот :)

## Графический интерфейс (GUI-interface) в роли "гитары"

Делать запросы к БД лучше делать в удобной и наглядной графической среде.

### 1. Установка Workbench для работы с MySQL/MariaDB

Скачиваем последнюю версию для своей ОС:
[https://downloads.mysql.com/archives/workbench/](https://downloads.mysql.com/archives/workbench/)

Инструкция по установке скаченного архива:
[https://dev.mysql.com/doc/workbench/en/wb-installing.html](https://dev.mysql.com/doc/workbench/en/wb-installing.html)

### 2. Установка универсального Dbeaver

Это универсальный графический интерфейс "на все случаи жизни"
[https://dbeaver.io/download/](https://dbeaver.io/download/)


## Установка локального сервера СУБД

Системы управления базами данных обычно работают как серверные приложения.
Удобнее всего начать с установки СУБД на свой компьютер, чтобы практиковаться на собственном локальном сервере СУБД.

Нам потребуются 2 сервера: MySQL и PostgreSQL

### 1. Установка MySQL и PostgreSQL на локальный компьютер

Если работать с БД MySQL и PostgreSQL постоянно (нормальная ситуация для fullstack-разработчика), то есть смысл именно в локальной установке.

Установка MySQl server:
[https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)

Установка PostgreSQL server:
[https://www.postgresql.org/docs/current/tutorial-install.html](https://www.postgresql.org/docs/current/tutorial-install.html)

### 2. Установка MySQL и PostgreSQL в докере

Всё описано в файлах:
- `docker-compose.yml`
- `.dockerignore`
- `.env`


## Установка примеров БД для MySQL

Ссылка на GitHub: https://github.com/datacharmer/test_db/

Упрощённый вариант можно взять прямо здесь из файла: `employees.sql`

Открываем в Workbench и запускаем на выполнение.

БД `sakila`:
- сначала скачиваем из репозитория файл `sakila-mv-schema.sql`
- затем файл `sakila-mv-data.sql`
- затем в том же порядке открываем и выполняем эти скрипты в Workbench (Dbeaver)

