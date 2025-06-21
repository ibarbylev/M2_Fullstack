import psycopg2  # pip install psycopg2-binary
from local_settings import postgres_config
# Параметры подключения
conn = psycopg2.connect(**postgres_config)
# если нужно автоматически коммитить все изменения в БД
# conn.autocommit = True)

# Создаём курсор
cur = conn.cursor()

# Выполняем SQL-запрос
cur.execute("SELECT * FROM training_json;")

# Получаем все строки
rows = cur.fetchall()

# Выводим результат
for row in rows:
    print(row)

# Закрываем соединение
cur.close()
conn.close()
