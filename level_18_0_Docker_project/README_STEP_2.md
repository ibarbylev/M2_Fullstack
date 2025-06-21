# Шаг 2 Перенос проектов в docker-контейнеры

Создаём контейнеры для 3-х основных элементов проекта:
- фронтенда
- бекенда
- и базы данных


## Добавляем Dockerfile во frontend
```
cat > frontend/Dockerfile <<EOF
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
# npm ci устанавливает пакеты согласно package-lock.json.
# npm install обновляет package-lock.json. Поэтому версии пакетов могут неожиданно измениться при сборке образа.
RUN npm ci

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
EOF

```


## Добавляем Dockerfile в backend
```
cat > backend/Dockerfile <<EOF
FROM python:3.12-slim

WORKDIR /app

# Копирование и установка зависимостей
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Копирование исходного кода
COPY . .

# Запуск через run.py
ENV FLASK_APP=app
CMD ["python", "run.py"]

EOF

```

## Добавляем файл docker-compose.yml


```
cat > docker-compose.yml <<EOF
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    networks:
      - task-network
      
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - database
    networks:
      - task-network
    environment:
      - DATABASE_URL=postgresql://taskuser:taskpassword@database:5432/taskdb
      
  database:
    image: postgres:13
    environment:
      - POSTGRES_DB=taskdb
      - POSTGRES_USER=taskuser
      - POSTGRES_PASSWORD=taskpassword
    networks:
      - task-network
    volumes:
      - db-data:/var/lib/postgresql/data
      
networks:
  task-network:
    driver: bridge
    
volumes:
  db-data:

EOF

```

## Проверяем работу контейнеров
- запускаем flask: `http://localhost:5000`
- запускаем react: `http://localhost:3000`
- смотрим логи database: 
  ```
  # находим имя контейнера БД
  docker ps
  
  # проверяем логи найденного контейнера базы данных
  docker logs task_management_app-database-1
  ```
  
**Второй шаг проекта успешно выполнен!**