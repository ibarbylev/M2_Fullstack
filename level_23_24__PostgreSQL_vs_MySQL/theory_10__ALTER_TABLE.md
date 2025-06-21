# Изменение полей и ограничений в PostgreSQL и MySQL

## 1. Изменение структуры таблицы — общие операции

| Операция                         | PostgreSQL                          | MySQL (8.0+)                     |
|---------------------------------|-----------------------------------|---------------------------------|
| Добавить столбец                | ✅ `ALTER TABLE ADD COLUMN`       | ✅ `ALTER TABLE ADD COLUMN`      |
| Удалить столбец                | ✅ `ALTER TABLE DROP COLUMN`      | ✅ `ALTER TABLE DROP COLUMN`     |
| Изменить тип столбца           | ✅ `ALTER TABLE ALTER COLUMN TYPE`| ✅ `ALTER TABLE MODIFY COLUMN`   |
| Переименовать столбец          | ✅ `ALTER TABLE RENAME COLUMN`    | ✅ `ALTER TABLE RENAME COLUMN`* |
| Добавить ограничение           | ✅ `ALTER TABLE ADD CONSTRAINT`   | ✅ `ALTER TABLE ADD CONSTRAINT`  |
| Удалить ограничение            | ✅ `ALTER TABLE DROP CONSTRAINT`  | ✅ `ALTER TABLE DROP FOREIGN KEY` / `DROP INDEX` |

\* В MySQL `RENAME COLUMN` поддерживается с версии 8.0.4.

---

## 2. Примеры

### Добавление столбца

```sql
ALTER TABLE users ADD COLUMN email VARCHAR(100);
```

При создании таблицы и/или добавление ограничений удобно сразу же указывать их имена,  
чтобы облегчить обращение к этим ограничениям в будущем (при их изменении/удалении).

Пример добавления `FOREIGN KEY`:
```sql
ALTER TABLE orders
ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```

Пример удаления `FOREIGN KEY`:
- PostgreSQL:
```sql
ALTER TABLE orders DROP CONSTRAINT fk_user;
```

- MySQL:
```sql
ALTER TABLE orders DROP FOREIGN KEY fk_user;
```