В PostgeSQL (в отличии от MySQL) при подключение через графические интерфейс ОБЯЗАТЕЛЬНО нужно указывать БД.

Поэтому, БД сначала нужно создать в терминале, а уже потом настраивать подключение в DBeaver

```
sudo -i -u postgres
psql
```
или же сразу 
```
sudo -u postgres psql
```

Появиться приглашение `sudo -i -u postgres`

Можно сначала проверить существующие базы данных:
```
\l
```
Создаём БД:
```
CREATE DATABASE java_rush WITH OWNER postgres ENCODING 'UTF8';
```

### Подключение через графический интерфейс (Dbeaver или PgAdmin)

*Host*: **localhost**
*Port (предлагается по умолчанию)*: **5432**
*Login*: **postrges**
*Password*: **(ваш_пароль)**
*Database*: **java_rush**
