import psycopg2  # pip install psycopg2-binary
from local_settings import postgres_config
# Параметры подключения
with psycopg2.connect(**postgres_config) as conn:
    # Создаём курсор
    with conn.cursor() as cur:

        # Выполняем SQL-запрос
        cur.execute("SELECT * FROM training_json;")

        # Получаем все строки
        rows = cur.fetchall()

        # Выводим результат
        for row in rows:
            print(row)

# Закрывать соединение "вручную" уже не нужно)))
# cur.close()
# conn.close()
