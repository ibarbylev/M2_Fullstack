# 🛠️ Как создать docker-compose.yml с сетью — пошагово и правильно

Рассмотрим проект с сервером на Flask (api/) и клиентом на Python (client/), каждый со своим Dockerfile. Контейнеры будут взаимодействовать через общую сеть mynetwork.
## ✅ Шаг 1: Структура проекта
```
docker-demo/
│
├── api/
│   ├── Dockerfile
│   └── app.py
│
├── client/
│   ├── Dockerfile
│   └── main.py
│
└── docker-compose.yml
```
## ✅ Шаг 2: Dockerfile для каждого сервиса
📁 `api/Dockerfile` (Flask):
```
FROM python:3.12-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

COPY app.py .
CMD ["python", "app.py"]
```

📁 `client/Dockerfile` (Python-запрос к API):
```
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY client.py .

CMD ["python", "-u", "client.py"]
```

## ✅ Шаг 3: Код API и клиента
📄 `api/app.py`
```
from flask import Flask
app = Flask(__name__)


@app.route("/")
def hello():
    return "Привет из API!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
```
📄 `client/main.py`

    ⚠️ Важно: здесь используем имя сервиса api, а не имя контейнера api-container:
```
import time
import requests

while True:
    try:
        response = requests.get("http://api-container:5000/")
        # response = requests.get("http://api:5000/")
        print("Ответ от API:", response.text)
    except Exception as e:
        print("Ошибка при подключении к API:", e)
    time.sleep(5)
```

## ✅ Шаг 4: docker-compose.yml с сетью
```
version: "3.9"

services:
    api:
        build: ./api
        container_name: api-container
        networks:
            - mynetwork
        ports:
            - "5000:5000"

    client:
        build: ./client
        container_name: client-container
        depends_on:
            - api
        networks:
            - mynetwork

networks:
    mynetwork:
        driver: bridge
```

## ✅ Шаг 5: Объяснение ключевых моментов
📌 Объяснение
- `networks`:	Создаётся отдельная сеть mynetwork, в которую входят оба контейнера.
- `container_name`:	Можно задать имя, но для связи между контейнерами используйте api, client — имена сервисов!
- `depends_on`:	Гарантирует, что client запустится после api.

📌 Обращение из client к api должно идти через http://api:5000/ — это имя сервиса, а не имя контейнера.

## ✅ Шаг 6: Запуск и проверка

В корне проекта выполните:
```
docker compose up --build
```
В консоли клиента вы должны увидеть:
```
Response from API: Hello from API!
```

## ✅ Шаг 7: Завершение работы
```
docker compose down
```
Или с полной очисткой:
```
docker compose down -v
```
## 🎯 Итого

Мы создали Docker Compose систему:

- с двумя сервисами (api и client);
- с изолированной сетью;
- с правильным обращением по имени сервиса;
- и, самое главное, - с запуском всей системы одной командой!