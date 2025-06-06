# ❓ Что такое docker compose?

`Docker Compose` — это инструмент, который позволяет:
- запускать сразу несколько контейнеров (например, сервер, клиент, БД),
- управлять ими как одной системой,
- описывать всю конфигурацию в одном месте — в YAML-файле.

## Что делает `Dockerfile` и что `docker-compose.yml`?

### 📦 Что делает Dockerfile?

`Dockerfile` — это инструкция по сборке образа. 

Он описывает КАК собрать один контейнер: какие команды выполнить, какие файлы скопировать, какой будет стартовая команда и т.д.

🔍 Что он делает:
- Берёт базовый образ Python.
- Копирует в него ваш код.
- Устанавливает зависимости.
- Задаёт команду, которая будет выполняться при запуске контейнера.

📌 Результат: создаётся образ — его можно запустить как контейнер.


## 🧩 Что делает docker-compose.yml?

`docker-compose.yml` — это инструкция по запуску сразу нескольких контейнеров, включая их связь между собой, тома, сети, переменные и т.д.

Он описывает КАК ЗАПУСТИТЬ всё приложение (всю систему), включая:
- какой образ использовать (или где собрать)
- какие порты пробрасывать
- какие переменные передать
- как связать контейнеры (например, веб + база данных)

🔍 Что он делает:

- Строит контейнер из Dockerfile (для web)
- Запускает базу данных
- Связывает их в одну сеть
- Пробрасывает порты

📌 Результат: запускается целая система из нескольких контейнеров.
🧠### 📋 Краткое сравнение: `Dockerfile` vs `docker-compose.yml`

|               | `Dockerfile`                          | `docker-compose.yml`                             |
|---------------|----------------------------------------|---------------------------------------------------|
| 📦 Назначение | Сборка образа                         | Запуск группы контейнеров                         |
| ⚙️ Описание   | Инструкции по сборке                  | Как связать и запустить контейнеры                |
| 📁 Формат     | Текстовый файл (`Dockerfile`)         | YAML-файл (`docker-compose.yml`)                  |
| 🧱 Использует | `docker build`, `docker run`          | `docker compose up`                               |
| 🔗 Связь      | Описывает один контейнер              | Управляет многими сервисами                       |



## 🧾 Что за файл YAML и зачем он нужен?

Этот файл — сердце Docker Compose.
- Название по умолчанию: docker-compose.yml 
- Это описание всей системы:
  - какие сервисы (контейнеры) нужны;
  - из чего они собираются (build);
  - как связаны между собой (depends_on);
  - какие порты нужно пробросить (ports);
  - и многое другое (volumes, networks, переменные и т.д.).

Он заменяет ручной запуск каждого контейнера по отдельности и всё централизует.
## 🔍 Что делает приведённый ранее пример?
```
version: "3.9"

services:
    api:
        build: ./api
        container_name: api-container
        ports:
            - "5000:5000"

    client:
        build: ./client
        container_name: client-container
        depends_on:
            - api
```
📌 Объяснение:
- `version: "3.9"`:Определяет версию синтаксиса Docker Compose,
- `services`:	Описываем контейнеры, которые нужны
- `api`:	Первый сервис, собирается из папки `./api`
- `build`:	Сборка из Dockerfile в указанной папке
- `container_name`:	Имя контейнера — удобно для диагностики
- `ports`:	Проброс порта (хост:контейнер), здесь 5000
- `client`:	Второй сервис, аналогично
- `depends_on`:	Запуск client после api

## ❌ Может ли Docker Compose работать без YAML-файла?

Нет, по сути не может.

Docker Compose всегда требует конфигурацию. Если не передан YAML-файл, он ищет файл по умолчанию: `docker-compose.yml` или `docker-compose.yaml` в текущей директории.

🧩 Но можно указать другой файл флагом -f:

docker compose -f myproject.yml up

## Резюме: 
YAML-файл обязателен, но может называться по-разному.  
Важно явно указать его, если файл не стандартный.

## Как создать образы и запустить контейнеров

В директории, где находится `docker-compose.yml`, достаточно запустить команду:

```
docker-compose up --build
```
