## Типы заголовков HTTP

### 1. General Headers (Общие заголовки)

| Заголовок  | Описание | Пример |
|------------|----------|---------|
| `Cache-Control` | Управляет кэшированием ресурсов | `Cache-Control: no-cache` |
| `Connection` | Управляет поведением соединения | `Connection: keep-alive` |
| `Date` | Дата и время создания сообщения | `Date: Wed, 23 Feb 2025 12:00:00 GMT` |
| `Via` | Информация о промежуточных прокси-серверах | `Via: 1.1 proxy` |
| `Warning` | Предупреждения о возможных проблемах | `Warning: 110 Response is stale` |

Примечание: **General Headers** используются как в **HTTP-запросах**, так и в **HTTP-ответах**.

---

### 2. Request Headers (Заголовки запроса)

| Заголовок  | Описание | Пример |
|------------|----------|---------|
| `Accept` | Определяет типы данных, которые клиент может обработать | `Accept: text/html` |
| `Authorization` | Отправляет данные для аутентификации | `Authorization: Basic dXNlcjpwYXNz` |
| `Host` | Указывает хост сервера | `Host: example.com` |
| `User-Agent` | Информация о клиенте (браузере, ПО) | `User-Agent: Mozilla/5.0` |
| `Referer` | Указывает URL, с которого был сделан запрос | `Referer: https://google.com` |

Примечание: **Request Headers** отправляются **только в HTTP-запросах**.

---

### 3. Response Headers (Заголовки ответа)

| Заголовок  | Описание | Пример |
|------------|----------|---------|
| `Server` | Информация о сервере | `Server: Apache/2.4.1` |
| `Set-Cookie` | Отправляет cookie клиенту | `Set-Cookie: sessionId=abc123; Path=/` |
| `Location` | Указывает URL для редиректа | `Location: https://example.com` |
| `WWW-Authenticate` | Запрашивает аутентификацию | `WWW-Authenticate: Basic realm="User Login"` |
| `Retry-After` | Время ожидания перед повторным запросом | `Retry-After: 120` |

Примечание: **Response Headers** используются **только в HTTP-ответах**.

---

### 4. Entity Headers (Заголовки сущности)

| Заголовок  | Описание | Пример |
|------------|----------|---------|
| `Content-Type` | Определяет тип содержимого | `Content-Type: application/json` |
| `Content-Length` | Длина тела сообщения (в байтах) | `Content-Length: 2048` |
| `Last-Modified` | Дата последнего изменения ресурса | `Last-Modified: Mon, 22 Feb 2025 10:30:00 GMT` |
| `ETag` | Уникальный идентификатор версии ресурса | `ETag: "34a64df551425fcc55e4d42a148795d9"` |
| `Content-Encoding` | Указывает метод сжатия | `Content-Encoding: gzip` |

Примечание: **Entity Headers** сопровождают **тело сообщения** в запросах и ответах.
