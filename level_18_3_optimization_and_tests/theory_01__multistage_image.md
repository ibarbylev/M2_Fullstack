## Предыдущий вариант `Dockerfile`:

```
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "app.py"]
```

## Его multistage версия:

```
# Этап сборки
FROM python:3.12-slim AS builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# Этап финального образа
FROM python:3.12-slim

WORKDIR /app

# Копируем установленные зависимости из builder-этапа
COPY --from=builder /install /usr/local

# Копируем оставшиеся файлы проекта
COPY . .

CMD ["python", "app.py"]
```

- На этапе сборки (builder) устанавливаются зависимости в отдельную директорию (/install), не загрязняя системные пути.

- На финальном этапе в итоговый образ копируются только установленные пакеты и чистый Python-код — без кешей pip и без build-временных данных.

Это в итоге помогает сделать образ компактнее и чище.