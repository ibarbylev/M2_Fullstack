import random
import os
import shutil
import string
import time
from pprint import pprint

import psycopg2

postgres_config = {
    "dbname": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "host": os.getenv("DB_HOST"),
    "port": os.getenv("DB_PORT")
}


def random_filename(filename, length=12):
    extension = filename.split('.')[-1]
    chars = string.ascii_letters + string.digits
    name = ''.join(random.choices(chars, k=length))
    return f"{name}.{extension}"


class PostgresManager:
    def __init__(self, config):
        self.config = config
        # если нужно автоматически коммитить все изменения в БД
        self.autocommit = True
        self.conn = None
        self.cur = None

    def __enter__(self):
        # Добавил дополнительно: иногда Postgres не успевает загрузиться
        # до запуска Python скрипта
        # Проверка готовности PostgreSQL для подключения
        for i in range(10):
            try:
                self.conn = psycopg2.connect(**self.config)
                break
            except psycopg2.OperationalError:
                print("Postgres not ready yet, retrying...")
                time.sleep(2)
        else:
            raise RuntimeError("Could not connect to Postgres after 10 tries")
        self.cur = self.conn.cursor()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.cur:
            self.cur.close()
        if self.conn:
            self.conn.close()

    def create_table(self):
        self.cur.execute("""
        CREATE TABLE IF NOT EXISTS images (
            id SERIAL PRIMARY KEY,
            filename TEXT NOT NULL,
            original_name TEXT NOT NULL,
            size INTEGER NOT NULL,
            upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            file_type TEXT NOT NULL
        );""")
        self.cur.execute("commit;")
        print("Table created successfully")

    def add_file(self, f):
        try:
            source_file = os.path.join('/app/images_source', f)
            target_dir = "/app/images"

            filename = random_filename(f)  # создаём случайное имя файла
            target_file = os.path.join(target_dir, filename)

            shutil.copy(source_file, target_file)

            original_name = f
            size = round(os.stat(source_file).st_size / 1000, 1)
            file_type = f.split('.')[-1]
            self.cur.execute(
                """
            INSERT INTO images (filename, original_name, size, file_type)
            VALUES (%s, %s, %s, %s);""",
                (filename, original_name, size, file_type)
            )
            print(f"Файл {f} добавлен")
        except Exception as e:
            print(e)

    def show_table(self):
        self.cur.execute("""SELECT * FROM images;""")
        rows = self.cur.fetchall()
        for row in rows:
            print(row)

    def get_page_by_page_num(self, page_num, is_print=True):
        # page_num -> 1 - 100000
        offset = (page_num - 1) * 10
        self.cur.execute("""SELECT * FROM images OFFSET %s LIMIT 10;""", (offset,))
        rows = self.cur.fetchall()
        if not is_print:
            return rows
        for row in rows:
            print(row)
        return None

    def get_id_by_filename(self, f):
        self.cur.execute("""SELECT id FROM images WHERE filename = %s;""", (f,))
        id = self.cur.fetchone()[0]
        print('id: ' + str(id))

    def delete_by_id(self, id):
        try:
            self.cur.execute("""DELETE FROM images WHERE id = %s;""", (id,))
            print(f"Запись с id {id} успешно удалена!")

        except Exception as e:
            print(e)



if __name__ == '__main__':
    with PostgresManager(postgres_config) as pm:
        pm.create_table()
        # files = [f for f in os.listdir('./images_source')]
        # print(*files)
        # for f in files:
        #     pm.add_file(f)
        pm.show_table()
        print('----  Пагинация -------')
        # pm.delete_by_id(4)
        pm.get_page_by_page_num(2)
