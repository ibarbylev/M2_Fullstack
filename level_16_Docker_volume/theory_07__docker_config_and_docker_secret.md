## ⚙️ Работа с конфигурациями и секретами в Docker (`docker config` и `docker secret`)

### 📌 Что это?

Docker предоставляет встроенные механизмы управления **конфигурационными файлами** (`docker config`) и **секретами** (`docker secret`) при использовании **Docker Swarm** — встроенной системы оркестрации контейнеров. Эти инструменты позволяют централизованно и безопасно управлять конфиденциальной информацией и настройками приложений, развёрнутых в кластере.

---

### 🎯 Какие задачи решает?

* **Безопасность**: Секреты (например, пароли, API-ключи) передаются только в зашифрованном виде и доступны только тем контейнерам, которым это разрешено.
* **Изоляция конфигурации**: Конфигурационные файлы можно менять независимо от образов приложений — это упрощает развёртывание и обновление.
* **Управление на уровне кластера**: Всё это работает только в Docker Swarm, что даёт централизованное управление и масштабируемость.

---

### 📅 Когда и как используется?

Использование `config` и `secret` оправдано в следующих случаях:

* Вы разворачиваете приложения через **Docker Swarm**.
* Вам нужно **безопасно передать пароли, сертификаты или ключи** в контейнеры.
* Вам нужно передавать приложениям **конфигурационные файлы** (например, `nginx.conf`, `app.conf`) без жёсткого включения их в Docker-образы.
* Вы хотите **обновлять конфигурации или секреты без пересборки образов**.

Пример сценария:

* У вас есть веб-сервер nginx, использующий конфигурационный файл;
* Приложение подключается к базе данных с помощью имени пользователя и пароля;
* Все эти данные передаются контейнерам с помощью `docker config` и `docker secret`.

---

### 📁 1. `docker config`: Работа с конфигурациями

#### ✅ Основные команды

Создание конфигурации:

```bash
docker config create <config_name> <file>
```

Пример:

```bash
docker config create nginx_conf nginx.conf
```

Просмотр списка конфигураций:

```bash
docker config ls
```

Просмотр содержимого конфигурации:

```bash
docker config inspect --pretty <config_name>
```

Удаление конфигурации:

```bash
docker config rm <config_name>
```

Использование в сервисе:

```bash
docker service create \
  --name webserver \
  --config source=nginx_conf,target=/etc/nginx/nginx.conf \
  nginx:alpine
```

#### 📝 Особенности

* Конфигурации доступны контейнерам в режиме "только чтение".
* Автоматически монтируются как файл внутри контейнера.

---

### 🔐 2. `docker secret`: Работа с секретами

#### ✅ Основные команды

Создание секрета:

```bash
echo "my_db_password" | docker secret create db_pass -
```

Список секретов:

```bash
docker secret ls
```

Просмотр метаданных секрета:

```bash
docker secret inspect <secret_name>
```

Удаление секрета:

```bash
docker secret rm <secret_name>
```

Использование в сервисе:

```bash
docker service create \
  --name db \
  --secret db_pass \
  mysql:5.7
```

Внутри контейнера секрет будет доступен по пути:

```
/run/secrets/db_pass
```

#### 📝 Особенности

* Секреты недоступны вне контейнера и шифруются в памяти.
* Каждый секрет можно подключить только к нужным сервисам.

---

### 🔍 Сравнение `config` и `secret`

| Характеристика  | `docker config`              | `docker secret`                 |
| --------------- | ---------------------------- | ------------------------------- |
| Тип данных      | Конфигурационные файлы       | Конфиденциальные данные         |
| Использование   | NGINX, приложения, настройки | Пароли, токены, приватные ключи |
| Доступность     | Только в Swarm               | Только в Swarm                  |
| Безопасность    | Обычные данные               | Шифруется в передаче и в памяти |
| Где монтируется | В любом месте в контейнере   | Только в `/run/secrets/<name>`  |

---

### 🛠 Пример с `docker-compose`

```yaml
version: '3.8'

services:
  app:
    image: my_app_image
    deploy:
      replicas: 1
    secrets:
      - db_user
      - db_password
    configs:
      - source: app_config
        target: /etc/myapp/app.conf

secrets:
  db_user:
    external: true
  db_password:
    external: true

configs:
  app_config:
    external: true
```

Перед запуском убедитесь, что секреты и конфиги созданы через `docker secret create` и `docker config create`.