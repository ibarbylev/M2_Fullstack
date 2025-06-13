## Должно быть установлено
- `docker`
- `nvm` (Node Version Manager — это инструмент для управления версиями Node.js
- `npm` (Node Package Manager) — это менеджер пакетов для Node.js (аналог pip в Python)
- `Node.js` 


### Установим Node.js и npm правильно через nvm
```
# 1. Установим nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# После этого обновите сессию терминала:
source ~/.bashrc

# Проверьте, что nvm работает:
command -v nvm

# Должно быть: 
nvm
```

### 2.2 Установим последнюю LTS-версию Node.js
```
nvm install --lts
nvm use --lts

# Сделаем эту версию версией по умолчанию:

nvm alias default lts/*

# проверим результат

node -v   # должно быть что-то вроде v22.x.x
npm -v    # версия npm, что-то вроде v10.x.x
```

## Установка пакетов Python
```
pip install Flask Flask-SQLAlchemy Flask-Migrate psycopg2-binary flask-cors
```

## Сохраним результат в requirements.txt
```
pip freeze > requirements.txt
```

## docker-project

**1. Frontend**:
- **ReactJS**: библиотека для создания пользовательских интерфейсов.
- **Axios**: библиотека для выполнения HTTP-запросов.

**2. Backend**:
- **Python**: язык программирования для создания серверной части.
- **Flask**: веб-фреймворк для создания REST API.
- SQLAlchemy: ORM для взаимодействия с базой данных.

**3. Database**:
- **PostgreSQL**: реляционная база данных для хранения информации о пользователях и задачах.

**4. Контейнеризация и оркестрация**:
- **Docker**: платформа для контейнеризации приложений.
- **Docker Compose**: инструмент для управления многоконтейнерными приложениями.


## Общая структура проекта:
```
task_management_app/
│
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── run.py
│   └── app
│       ├── __init__.py
│       ├── models.py
│       └── routes.py
│
├── frontend/
│   ├── client.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── database/ (только в контейнере!)
│
├── docker-compose.yml
├── requirements.txt
└── README.md 
```

## Cоздание основных директорий проекта

### ===== Создание 2-х папок проекта
```
mkdir frontend backend
```
### ===== Создание ReactJS проекта внутри папки frontend

```
cd frontend
npx create-react-app .
```

При успешной установке в итоге должно появиться `Happy hacking!`

Запускаем React `npm start`

Видим результат в браузере: `http://localhost:3000/`

### ===== Создание Flask проекта внутри папки backend

В НОВОМ(!!!) окне терминала копируем и запускаем этот скрипт
```
cd backend
mkdir app

# ==== создаём файл `backend/app/__init__.py` и его содержимое:
cat > app/__init__.py <<EOF
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://taskuser:taskpassword@database:5432/taskdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import routes
EOF



# ==== создаём файл `backend/app/models.py` и его содержимое:
cat > app/models.py <<EOF
from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    tasks = db.relationship('Task', backref='owner', lazy=True)
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username
        }

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.String(20), nullable=False, default="невыполнена")
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "owner_id": self.owner_id,
            "status": self.status
        }
EOF


# ==== создаём файл `backend/app/routes.py` и его содержимое:
cat > app/routes.py <<EOF
from app import app

@app.route('/')
def index():
    return "Hello, Task Management App!"
EOF


# ==== создаём файл `backend/run.py` и его содержимое:
cat > run.py <<EOF
from app import app

if __name__ == '__main__':
    app.run(host='0.0.0.0')
EOF


# ==== создаём файл `backend/requirements.txt` и его содержимое:
cat > requirements.txt <<EOF
Flask
Flask-SQLAlchemy
Flask-Migrate
psycopg2-binary
flask-cors
EOF

cd ..
```

Запускаем `./backand/run.py`

И переходим по ссылке: `http://127.0.0.1:5000`


**Первый шаг проекта успешно выполнен!**