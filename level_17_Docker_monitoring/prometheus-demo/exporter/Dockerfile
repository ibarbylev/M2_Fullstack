FROM python:3.13-slim

# Установка зависимостей
RUN pip install prometheus_client

# Создание рабочей директории
WORKDIR /app

# Копируем скрипт экспортера
COPY exporter.py .

# Запуск экспортера
CMD ["python", "exporter.py"]
