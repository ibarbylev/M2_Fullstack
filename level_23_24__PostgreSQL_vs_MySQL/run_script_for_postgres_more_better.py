import psycopg2
from local_settings import postgres_config

class PostgresManager:
    def __init__(self, config, autocommit=False):
        self.config = config
        # если нужно автоматически коммитить все изменения в БД
        # self.autocommit = autocommit
        self.conn = None
        self.cur = None

    def __enter__(self):
        self.conn = psycopg2.connect(**self.config)
        self.cur = self.conn.cursor()
        return self.cur  # возвращаем курсор для работы внутри with

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.cur:
            self.cur.close()
        if self.conn:
            if exc_type is None:
                self.conn.commit()  # коммитим, если не было исключений
            else:
                self.conn.rollback()  # откатываем при ошибке
            self.conn.close()

# Пример использования

with PostgresManager(postgres_config) as cur:
    cur.execute("SELECT * FROM training_json;")
    rows = cur.fetchall()
    for row in rows:
        print(row)
