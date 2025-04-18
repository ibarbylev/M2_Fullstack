# Используем официальный образ Python как базовый
FROM python:3.12-slim

# Копируем текущие файлы в контейнер
COPY . /app

# Устанавливаем рабочую директорию
WORKDIR /app

# Запускаем Python-файл
CMD ["python", "app.py"]
