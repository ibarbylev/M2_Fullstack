# HTTP GET: структура запроса и ответа

HTTP GET-запрос отправляется клиентом (например, браузером или API-клиентом) на сервер. 
Он включает заголовки, параметры запроса и куки.

## 1. HTTP-запрос

Пример GET-запроса:
```
GET /api/v1/resource?id=123&name=example HTTP/3
Host: example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Referer: https://example.com/previous-page
Authorization: Bearer <your_token_here>
Cookie: session_id=abc123; theme=dark
Cache-Control: no-cache
Pragma: no-cache
```

### Разбор запроса:

Первая строка
- GET — метод запроса.
- /api/v1/resource?id=123&name=example — путь и параметры.
- HTTP/3 — версия протокола.

Заголовки
- Host: example.com — домен сервера.
- User-Agent: Mozilla/5.0 (...) — информация о клиенте.
- Accept: text/html,application/xhtml+xml,... — допустимые форматы ответа.
- Accept-Language: en-US,en;q=0.5 — предпочтительный язык.
- Accept-Encoding: gzip, deflate, br — поддерживаемые способы сжатия.
- Connection: keep-alive — поддержка соединения при нескольких последовательных запросах.
- Referer: https://example.com/previous-page — откуда пришел запрос.
- Authorization: Bearer <your_token_here> — токен аутентификации.
- Cookie: session_id=abc123; theme=dark — передача куков.
- Cache-Control: no-cache — запрет кэширования.
- Pragma: no-cache — аналогично Cache-Control.

#### HTTP/3 — версия протокола.
- HTTP/3 — это новая версия HTTP, которая использует протокол QUIC вместо TCP.
- Она обеспечивает более быстрое и безопасное соединение, особенно при потере пакетов.

#### Сравнение с HTTP/1.1 и HTTP/2
| Версия  | Особенности |
|---------|-------------|
| **HTTP/1.1** | Использует TCP, поддерживает Keep-Alive, но передача последовательная (один запрос — один ответ). |
| **HTTP/2** | Использует TCP, но поддерживает **мультиплексирование** (несколько запросов в одном соединении). |
| **HTTP/3** | Использует **QUIC** вместо TCP, работает быстрее и лучше справляется с потерями пакетов. |


## 2. HTTP-ответ

Ответ сервера содержит статус, заголовки и тело.

Пример HTTP-ответа
```
HTTP/3 200 OK
Date: Sat, 23 Feb 2025 12:34:56 GMT
Server: Apache/2.4.41 (Ubuntu)
Content-Type: application/json
Content-Length: 123
Connection: keep-alive
Cache-Control: max-age=3600, public
Set-Cookie: session_id=abc123; Path=/; HttpOnly
Strict-Transport-Security: max-age=31536000; includeSubDomains
Access-Control-Allow-Origin: *
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
```

Пример (возможного) json-ответа
```
{
  "id": 123,
  "name": "example",
  "status": "active"
}
```
Разбор ответа

Первая строка
- HTTP/3 200 OK — статус ответа (200 — успех).

Заголовки
- Date: Sat, 23 Feb 2025 12:34:56 GMT — дата ответа.
- Server: Apache/2.4.41 (Ubuntu) — сервер.
- Content-Type: application/json — тип содержимого.
- Content-Length: 123 — длина тела ответа.
- Connection: keep-alive — соединение остается открытым.
- Cache-Control: max-age=3600, public — ответ можно кэшировать 1 час.
- Set-Cookie: session_id=abc123; Path=/; HttpOnly — установка куки.
- Strict-Transport-Security: max-age=31536000; includeSubDomains — защита HSTS.
- Access-Control-Allow-Origin: * — CORS-разрешения.
- X-Frame-Options: DENY — запрет встраивания в iframe.
- X-Content-Type-Options: nosniff — защита от MIME-тип атак.
- X-XSS-Protection: 1; mode=block — защита от XSS.

Тело ответа (JSON)
```
{
  "id": 123,
  "name": "example",
  "status": "active"
}
```
