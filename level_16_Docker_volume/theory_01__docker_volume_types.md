# Docker Volumes: Зачем и как использовать

В Docker контейнеры по умолчанию изолированы — все данные внутри них теряются при удалении контейнера.  
**Тома (Volumes)** используются для того, чтобы 
- **сохранять данные между запусками**, 
- **делиться файлами между контейнерами** или 
- **подключать внешние хранилища**.

**Docker-том** — это механизм, позволяющий подключать хранилище (локальное или внешнее) к контейнеру.  
Тома можно 
- создавать заранее или на лету, 
- подключать к одному или нескольким контейнерам 
- и выбирать, где физически будут храниться данные — на хосте, в RAM или во внешнем облаке.

**Преимущества использования томов:**

- Разделение данных и кода (данные не исчезают при удалении контейнера)
- Удобство резервного копирования и миграции
- Безопасный и управляемый доступ к данным
- Производительность выше, чем у bind-монтажей (в большинстве случаев)
- Возможность работы с облачными хранилищами через плагины

## 📦 Виды хранилищ в Docker и уровни управления ими: Docker, пользователь, внешние системы
```
Docker Storage
│
├── 1. Volumes (логически управляются Docker'ом)
│   │
│   ├── 1.1 Named Volumes             ← имя задано пользователем, управление осуществляется Docker'ом
│   └── 1.2 Anonymous Volumes         ← имя сгенерировано Docker'ом
│
├── 2. Volume Plugins (внешние хранилища через Docker Volume API)
│   └── Примеры: NFS, Amazon EFS, GlusterFS и др. ← физически управляются внешними системами
│
├── 3. Bind Mounts (управляются пользователем/ОС)
│   └── Прямой путь на хосте                    ← Docker только монтирует, но не управляет
│
└── 4. tmpfs Mounts (оперативная память, управляется ядром Linux)
    └── Хранение в оперативной памяти (RAM)     ← управление осуществляется ядром Linux
```


Рассмотрим подробнее указанные типы томов, их особенности и примеры использования.


### **1. Anonymous Volumes (Анонимные тома)**

- **Определение:**  
  Том, создаваемый Docker автоматически без имени, при монтировании тома в контейнер без указания имени.

- **Характеристика:**  
  Живёт пока жив контейнер. Не управляется явно. Автоматически удаляется при удалении контейнера (если не используется другим контейнером).

- **Где используется:**  
  В тестах, CI/CD, когда не нужно сохранять данные между запусками. Удобно для временного кэширования.

- **Пример реализации:**
  ```
  docker run -v /app/data busybox
  ```

---

### **2. Named Volumes (Именованные тома)**
_Документация Docker и сообщество разработчиков считают этот способ предпочтительным для хранения постоянных данных в контейнерах, **особенно в продакшене**._ 


- **Определение:**  
  Том с заданным именем, управляется Docker-Engine, хранится в `/var/lib/docker/volumes`.

- **Характеристика:**  
  Сохраняет данные независимо от жизненного цикла контейнера. Может использоваться многими контейнерами.

- **Где используется:**  
  При необходимости долговременного хранения (например, база данных), логов, конфигурации.

- **Пример реализации:**
  ```
  docker volume create mydata
  docker run -v mydata:/data busybox
  ```

---

### **3. Bind Mounts (Привязанные тома)**
_Предпочтительный способ на этапе разработки_

- **Определение:**  
  Прямое подключение директории с хоста внутрь контейнера.

- **Характеристика:**  
  Более гибкий и мощный, чем `named volume`. Видит все изменения сразу. Может быть нестабилен при переносе между ОС.

- **Где используется:**  
  В разработке — например, монтирование кода проекта внутрь контейнера. Также для логов и конфигураций с хоста.

- **Пример реализации:**
  ```
  docker run -v $(pwd)/app:/app busybox
  ```

---

### **4. tmpfs Mounts**

- **Определение:**  
  Хранилище в оперативной памяти, которое не сохраняется на диск.

- **Характеристика:**  
  Очень быстрое, данные теряются после остановки контейнера. Не кэшируется, не сохраняется.

- **Где используется:**  
  Когда нужно хранить чувствительные данные или кэш на время выполнения, но не сохранять после.

- **Пример реализации:**
  ```
  docker run --tmpfs /app/cache busybox
  ```

---

### **5. Volume Plugins (Тома через плагины)**

- **Определение:**  
  Тома, управляемые сторонними драйверами (например, для работы с AWS EFS, NFS, GCP Filestore).

- **Характеристика:**  
  Поддерживает удалённые, сетевые или распределённые файловые системы. Может потребовать доп. настройки.

- **Где используется:**  
  В продакшене и кластерных средах (Docker Swarm, Kubernetes), где важна отказоустойчивость и масштабируемость.

- **Пример реализации (с плагином):**
  ```bash
  docker volume create \
    --driver rexray/ebs \
    --name my-ebs-volume
  docker run -v my-ebs-volume:/data busybox
  ```

---

### **Итоговая таблица (по частоте использования):**

| №  | Тип              | Частота использования | Постоянство данных | Подходит для производства |
|----|------------------|------------------------|---------------------|----------------------------|
| 1  | Named Volume     | ⭐⭐⭐⭐                  | Да                  | ✅                         |
| 2  | Bind Mount       | ⭐⭐⭐                   | Да                  | ⚠️ (внимание к доступам)   |
| 3  | Anonymous Volume | ⭐⭐                    | Нет                 | ❌                         |
| 4  | tmpfs Mount      | ⭐                     | Нет                 | ⚠️ (ограничено RAM)        |
| 5  | Volume Plugin    | ⭐                     | Да                  | ✅                         |


## Разница между Named Volumes и Bind Mounts (между томом и привязанной директорией)

| Характеристика          | Том (Named Volume)                                     | Привязанная директория (Bind Mount)                 |
|-------------------------|--------------------------------------------------------|------------------------------------------------------|
| **Место хранения**      | Внутри Docker: `/var/lib/docker/volumes/…`            | В любой директории на хостовой машине               |
| **Кто управляет**       | Docker сам управляет путём и доступом                 | Вы явно указываете путь на хосте                    |
| **Создание**            | Через `docker volume create` или автоматически        | Указывается вручную при запуске контейнера          |
| **Переносимость**       | ✅ Высокая: легко копировать и переносить              | ⚠️ Привязано к конкретному пути на хосте            |
| **Кросс-платформенность**| ✅ Поддерживается                                      | ⚠️ Может не работать одинаково между ОС             |
| **Производительность**  | Оптимизировано Docker-движком                          | Может быть ниже и зависит от ОС и ФС                |
| **Безопасность**        | Контролируется Docker                                  | Полный прямой доступ к файловой системе хоста       |
| **Удобство в разработке**| ❌ Менее удобно для "горячих" правок                  | ✅ Отлично для разработки (live-изменения)          |
| **Типичный сценарий**   | Хранение данных БД, конфигураций                       | Монтирование исходного кода в контейнер             |
| **Пример**              | `docker run -v data-vol:/data busybox`                | `docker run -v $(pwd)/app:/app busybox`             |

### Вывод

- Используйте **Named Volumes**, если:
  - нужно надёжное и долговременное хранилище;
  - вы работаете в продакшене;
  - важна переносимость между машинами и ОС.

- Используйте **Bind Mounts**, если:
  - вы разрабатываете локально и хотите видеть изменения сразу;
  - работаете с файлами конфигураций или логами на хосте;
  - нужно отладить код без пересборки образа.

