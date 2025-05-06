**Prometheus** — это система мониторинга и сбора метрик с возможностью опроса (pull-модели), используемая для наблюдения за состоянием приложений, сервисов, серверов и инфраструктуры. 

Она часто применяется в связке с **Grafana** для визуализации данных.


## 📌 Описание Prometheus

- **Разработчик**: Originally by SoundCloud, теперь проект CNCF (Cloud Native Computing Foundation).
- **Метод сбора данных**: Pull-модель — Prometheus сам опрашивает `endpoints` (обычно /metrics).
- **Хранение данных**: Встроенная TSDB (Time Series Database).
- **Язык запросов**: PromQL (Prometheus Query Language).
- **Поддержка алертов**: Встроенный Alertmanager или внешние системы.

## 🛠️ Установка Prometheus

🐧 На Linux (Ubuntu/Debian)
```
# 1. Скачать последнюю версию
wget https://github.com/prometheus/prometheus/releases/latest/download/prometheus-*.linux-amd64.tar.gz

# 2. Распаковать архив
tar xvf prometheus-*.linux-amd64.tar.gz
cd prometheus-*.linux-amd64

# 3. Запустить
./prometheus --config.file=prometheus.yml
```

## 🐳 Через Docker
```
docker run -d --name prometheus \
  -p 9090:9090 \
  -v /path/to/prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus
```

## Добавить файл конфигурации `prometheus.yml`
### 📂 Зачем он нужен?

В `prometheus.yml` настраиваются:
- `global` – глобальные настройки, например, интервал сбора метрик (`scrape_interval`).
- `scrape_configs` – список источников метрик (`targets`), откуда Prometheus будет собирать данные.
- `rule_files` – подключение файлов с правилами для алертов и записей.
- `alerting` – настройка отправки алертов в Alertmanager.
- `remote_write` / `remote_read` – настройка удалённой отправки/чтения метрик (например, в Thanos или Cortex).


### 📌 Пример файла `prometheus.yml`

```
# === 1. Определяет интервал опроса (`scrape_interval`) ===
global:
  scrape_interval: 15s  # опрашивает каждый endpoint каждые 15 секунд

# === 2. Настраивает, какие источники данных (экспортеры) опрашивать ===
scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
      
# (Prometheus будет каждые 15 секунд обращаться 
# к http://localhost:8000/metrics и забирать метрики)
```

🧪 Что будет без `prometheus.yml`?

Prometheus просто не запустится или не будет собирать метрики, так как он не будет знать:
- откуда собирать данные;
- как часто;
- как их называть.



## 🧪 Пошаговый туториал: Установка и тестирование Prometheus в Docker

### 📁 Шаг 1: Создайте рабочую директорию проекта

```
prometheus-demo/
├── exporter/
│   ├── Dockerfile
│   └── exporter.py
├── alert.rules.yml     
├── docker-compose.yml
├── prometheus.yml

```

#### 📋 1. `alert.rules.yml` — простые тестовые алерты
```
groups:
  - name: demo_alerts
    rules:
      - alert: ExporterDown
        expr: up{job="python_exporter"} == 0
        for: 10s
        labels:
          severity: critical
        annotations:
          summary: "Python exporter недоступен"

      - alert: HighTemperature
        expr: room_temperature_celsius > 24
        for: 15s
        labels:
          severity: warning
        annotations:
          summary: "Температура выше нормы"
```
Здесь в блоке `expr:` используется язык `PromQL` (`Prometheus Query Language`).

`PromQL` — это декларативный язык запросов, используемый в Prometheus для выборки и анализа метрик. В этом примере:

    `up{job="python_exporter"} == 0`
    Проверяет, что метрика up (показатель доступности target'а) равна 0 для job с именем ``python_exporter.  
    Это означает, что экспортер недоступен.

    `room_temperature_celsius > 24`
    Проверяет, превышает ли метрика room_temperature_celsius значение 24. 
    То есть температура выше допустимого уровня.

Такие выражения используются внутри `alerting rules`, которые Prometheus оценивает периодически.   
Если условие `expr` выполняется в течение времени, заданного в `for`, то срабатывает оповещение.


#### 🛠️ 2. `prometheus.yml` — подключим alert.rules.yml
```
global:
  scrape_interval: 15s

rule_files:
  - /etc/prometheus/alert.rules.yml

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['prometheus:9090']

  - job_name: 'python_exporter'
    static_configs:
      - targets: ['python-exporter:8000']
```

#### 🐳 3. docker-compose.yml — добавим монтирование alert.rules.yml

```
services:
  prometheus:
    image: prom/prometheus
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - ./alert.rules.yml:/etc/prometheus/alert.rules.yml  # монтирование алертов
    depends_on:
      - python-exporter
    networks:
      - prometheus-net

  python-exporter:
    build: ./exporter
    container_name: python-exporter
    ports:
      - "8000:8000"  # 🔁 Проброс порта на хост-машину
    networks:
      - prometheus-net

networks:
  prometheus-net:
    driver: bridge
```

#### 🧪 4. Дополнительно: простой экспортер на Python

Требуется установка Python-библиотеки: `pip install prometheus_client`

Файл `exporter.py`:
```
from prometheus_client import start_http_server, Gauge, Counter
import time, random

temperature = Gauge('room_temperature_celsius', 'Room temperature in Celsius')
my_custom_metric = Counter('my_custom_metric', 'A custom counter for testing')


def simulate():
    while True:
        temperature.set(random.uniform(18, 25))
        my_custom_metric.inc()  # Увеличиваем значение
        time.sleep(5)
        

if __name__ == '__main__':
    start_http_server(8000)  # http://localhost:8000/metrics
    simulate()
```



#### 📋 5. Добавить `Dockerfile` для контейнера `executor.py`
```
FROM python:3.13-slim

# Установка зависимостей
RUN pip install prometheus_client

# Создание рабочей директории
WORKDIR /app

# Копируем скрипт экспортера
COPY exporter.py .

# Запуск экспортера
CMD ["python", "exporter.py"]
```


### 📁 Шаг 2: Запускаем проект

Открываем терминал в папке проекта `prometheus-demo`

```
docker-compose up --build -d
```

### ✅ Шаг 3: Проект запущен. Как его протестировать?

#### 1. 🔍 Проверить экспортер в браузере

Откройте в браузере: `http://localhost:8000/metrics`

Вы должны увидеть что-то вроде:
```
# HELP python_gc_objects_collected_total Objects collected during gc
# TYPE python_gc_objects_collected_total counter
python_gc_objects_collected_total{generation="0"} 1091.0
python_gc_objects_collected_total{generation="1"} 74.0
python_gc_objects_collected_total{generation="2"} 0.0
```
Это означает, что Python-экспортер работает и отдает метрику.


#### 2. 📊 Проверить Prometheus

Откройте в браузере: `http://localhost:9090`

Это веб-интерфейс Prometheus. Убедитесь, что:

- Вы видите интерфейс.
- Вверху есть поле "Expression".
- Введите туда `my_custom_metric_total` и нажмите `Execute`.

Пример результата:
```
my_custom_metric_total{instance="172.17.0.1:8000", job="python_exporter"}     12
```
- Добавьте блок с помощью `+ Add Query`, введите `room_temperature_celsius` и нажмите `Execute`.

Пример результата:
```
room_temperature_celsius{instance="172.17.0.1:8000", job="python_exporter"}  21
```

#### 3. 🔁 Проверить список targets (источников метрик)

Перейдите по ссылке: `http://localhost:9090/targets`

В браузере должно получиться что-то вроде этого:
```
Endpoint	                    Labels	                                        Last scrape	            State
http://localhost:9090/metrics   instance="localhost:9090"  job="prometheus"      44.884s ago 10ms        UP

Endpoint	                    Labels	                                        Last scrape	            State

http://172.17.0.1:8000/metrics  instance="172.17.0.1:8000" job="python_exporter"  52.239s ago 2ms    	UP
```

***
***
***

## 🧹 Напоминание как всё это удалить (Если нужно)

#### 1. Остановить и удалить контейнеры:
```
docker-compose down
```
#### 2. Удалить все образы, созданные этим docker-compose:
```
docker image rm prometheus-demo_python-exporter
```
#### 3. Удалить тома (если использовались):
```
docker volume prune
```
