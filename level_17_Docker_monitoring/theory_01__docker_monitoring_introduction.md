# 📊 Docker мониторинг

**Docker-мониторинг** — это процесс сбора, анализа и визуализации данных о состоянии и производительности Docker-контейнеров, образов, томов, сетей и хостов, на которых они работают. 

Он помогает выявлять проблемы, управлять ресурсами, обеспечивать стабильность и безопасность контейнеризированных приложений.

## 🧩 Основные понятия и определения в Docker-мониторинге

| Понятие                  | Определение                                                                                     |
|--------------------------|--------------------------------------------------------------------------------------------------|
| **Контейнер (Container)**| Изолированное окружение, в котором запускается приложение с его зависимостями.                   |
| **Образ (Image)**        | Шаблон, из которого создаются контейнеры. Содержит код, зависимости и инструкции.               |
| **Ресурсы**              | Системные ресурсы, используемые контейнерами: CPU, память, диск, сеть.                          |
| **Метрика**              | Числовой показатель, отражающий текущее состояние или поведение контейнера.                     |
| **Лог (Log)**            | Текстовая запись событий, ошибок и другой информации, выводимой контейнером.                    |
| **Событие (Event)**      | Действие или изменение состояния, например: запуск, остановка, перезапуск контейнера.           |
| **Состояние (Status)**   | Текущее состояние контейнера: `running`, `paused`, `exited` и др.                              |
| **Сборщик метрик (Exporter)**| Компонент, извлекающий метрики из контейнеров и передающий их в систему мониторинга.       |
| **Визуализация**         | Отображение метрик в виде графиков, таблиц и дашбордов (например, в Grafana).                   |
| **Алертинг (Alerting)**  | Система уведомлений, срабатывающая при достижении критических значений метрик.                  |
| **Мониторинг хоста**     | Наблюдение за состоянием самой машины-хоста, на которой запущены контейнеры.                    |


## 🎯 Задачи мониторинга в Docker-среде

| Задача                         | Описание                                                                                     |
|-------------------------------|----------------------------------------------------------------------------------------------|
| **Отслеживание ресурсов**      | Контроль использования CPU, памяти, сети и диска контейнерами и хостом.                     |
| **Раннее выявление проблем**   | Быстрое обнаружение утечек памяти, перегрузки CPU, нестабильной работы контейнеров.         |
| **Анализ производительности**  | Оценка времени отклика, загрузки контейнеров, эффективности использования ресурсов.         |
| **Обеспечение доступности**    | Гарантия, что сервисы внутри контейнеров работают без простоев.                             |
| **Автоматическое оповещение**  | Настройка алертов при выходе метрик за допустимые пределы (например, CPU > 90%).           |
| **Отладка и диагностика**      | Сбор логов, событий и метрик для анализа причин сбоев или неправильной работы.             |
| **Аудит и безопасность**       | Контроль за действиями в контейнерах, проверка образов на уязвимости.                       |
| **Планирование ресурсов**      | Исторический анализ метрик для оптимизации нагрузки и масштабирования.                     |
| **Управление жизненным циклом**| Мониторинг запусков, остановок, перезапусков контейнеров и их зависимости.                 |
| **Комплаенс и отчётность**     | Хранение истории метрик и событий для аудита и соответствия требованиям безопасности.       |

---

## 🧱 Уровни мониторинга в Docker-среде

| Уровень                        | Что мониторится                                                                 |
|-------------------------------|----------------------------------------------------------------------------------|
| **Хост-система (Node)**        | Использование ресурсов (CPU, память, диск, сеть), системные логи, аптайм.       |
| **Docker-демон**              | Состояние демона `dockerd`, ошибки, версии, конфигурация.                        |
| **Контейнеры**                | Метрики использования ресурсов, статус (`running`, `exited`), рестарты, логи.   |
| **Образы (Images)**           | Размер, теги, частота использования, устаревшие или уязвимые версии.            |
| **Сети Docker**               | Объём трафика, ошибки, соединения между контейнерами.                           |
| **Тома (Volumes)**            | Занятое место, частота доступа, время жизни, ошибки монтирования.              |
| **Оркестрация (если есть)**   | Состояние сервисов, количество реплик, распределение по нодам (Swarm, K8s).     |
| **Логи и события**            | Docker events (`start`, `stop`, `destroy`), stdout/stderr контейнеров.         |
| **Безопасность контейнеров**  | Сканирование образов, контроль доступа, действия внутри контейнера.             |


## 🛠️ Основные инструменты мониторинга Docker

| Название        | Описание                                                                | Установка (если применимо)                                                                 |
|------------------|-------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| **Prometheus**   | Система сбора и хранения метрик с мощным языком запросов (PromQL).      | `docker run -p 9090:9090 prom/prometheus`                                                   |
| **Grafana**      | Визуализация метрик из Prometheus и других источников.                  | `docker run -d -p 3000:3000 grafana/grafana`                                                |
| **cAdvisor**     | От Google. Сбор метрик о контейнерах: CPU, память, сеть, диск.          | `docker run -d -p 8080:8080 --volume=/:/rootfs:ro \`<br>`--volume=/var/run:/var/run:ro \`<br>`--volume=/sys:/sys:ro \`<br>`--volume=/var/lib/docker/:/var/lib/docker:ro \`<br>`--device=/dev/kmsg \`<br>`--name=cadvisor google/cadvisor:latest` |
| **Node Exporter**| Сбор метрик хост-системы (CPU, память, диск и т.д.) для Prometheus.     | `docker run -d -p 9100:9100 prom/node-exporter`                                             |
| **Docker stats** | Встроенная команда Docker для просмотра использования ресурсов.         | Встроено: `docker stats`                                                                    |
| **Zabbix**       | (зАбикс) Полноценная система мониторинга, автор Алексей Владышев.       | Используйте официальный образ: `docker run --name zabbix -d zabbix/zabbix-appliance`       |
| **ELK Stack**    | ElasticSearch + Logstash + Kibana — сбор и анализ логов контейнеров.    | Используется `docker-compose`, пример: https://github.com/deviantony/docker-elk            |
| **Portainer**    | Веб-интерфейс для управления и мониторинга Docker.                      | `docker run -d -p 9000:9000 --name portainer \`<br>`-v /var/run/docker.sock:/var/run/docker.sock \`<br>`portainer/portainer-ce` |
| **Netdata**      | Мониторинг в реальном времени, красивые графики, минимальная настройка. | `bash <(curl -Ss https://my-netdata.io/kickstart.sh)` или `docker run -d -p 19999:19999 netdata/netdata` |
| **Datadog**      | SaaS-решение с агентом, глубокая интеграция с Docker и Kubernetes.      | Требуется регистрация, установка агента: `docker run -d -e DD_API_KEY=<your_key> datadog/agent` |
