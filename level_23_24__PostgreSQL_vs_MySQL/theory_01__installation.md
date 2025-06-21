# Установка PostrgeSQL на Ubuntu

## 1. Добавьте официальный репозиторий PostgreSQL
```
sudo apt update
sudo apt install wget gnupg2 lsb-release -y
```
# Добавление ключа
```
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg
```
# Добавление репозитория
```
echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" | sudo tee /etc/apt/sources.list.d/pgdg.list
```

## 2. Обновите список пакетов
```
sudo apt update
```

## 3. Установите PostgreSQL 17
```
sudo apt install postgresql-17 -y
```

## 4. Проверить установку
```
psql --version
```
Должно отобразиться что-то вроде: `psql (PostgreSQL) 17.5`

## 5. Убедитесь, что служба работает
```
sudo systemctl status postgresql

```
Должно быть что-то вроде этого: 

```
~$ sudo systemctl status postgresql
● postgresql.service - PostgreSQL RDBMS
     Loaded: loaded (/lib/systemd/system/postgresql.service; enabled; vendor preset: enabled)
     Active: active (exited) since Sun 2025-06-08 12:49:03 EEST; 38min ago
    Process: 1408 ExecStart=/bin/true (code=exited, status=0/SUCCESS)
   Main PID: 1408 (code=exited, status=0/SUCCESS)

юни 08 12:49:03 su-HP-250-G8-Notebook-PC systemd[1]: Starting PostgreSQL RDBMS...
юни 08 12:49:03 su-HP-250-G8-Notebook-PC systemd[1]: Finished PostgreSQL RDBMS.
```

## 6. Задайте пароль

```
sudo -u postgres psql
```
Приветствие должно поменяться на `postgres=#`
Далее задайте пароль:
```
ALTER USER postgres WITH PASSWORD 'ваш_пароль';
```
