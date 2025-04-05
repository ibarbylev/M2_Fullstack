# Как создать WS подключение?

## 1. Создание WS Сервера на Python и WS Клиента на JavaScript

Это наиболее удобный вариант, позволяющий изучать и тестировать WS соединение с помощью собственного сервера.

### 1.1. Создание WS сервера на Python

- Установить виртуальное окружение (необязательно, но крайне желательно)
- Установить пакет `websockets`
  - `pip install websockets`
- Создать файл `ws_server.py` и добавить в него следующий код:

```Python
import asyncio
import websockets  # pip install websockets


async def handler(websocket, path):
    client_ip, client_port = websocket.remote_address  # Получаем IP и порт клиента
    print(f"Клиент {client_port} подключился")

    try:
        async for message in websocket:
            if message == "CLOSE":
                print(f"Клиент {client_port} сообщил об отключении")
                break

            print(f"Получено от {client_port}: {message}")
            await websocket.send(f"Эхо: {message}")

    except websockets.exceptions.ConnectionClosed:
        print(f"Клиент {client_port} отключился через ConnectionClosed")
    except asyncio.CancelledError:
        print(f"Клиент {client_port} отключился через CancelledError")
    except Exception as e:
        print(f"Ошибка с клиентом {client_port}: {e}")
    finally:
        print(f"Соединение с клиентом {client_port} закрыто")


start_server = websockets.serve(handler, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
print("WS Сервер Запущен по адресу: ws://localhost:8765")
asyncio.get_event_loop().run_forever()

print("Сервер Остановлен")
```

- Запустить скрипт
- В терминале должно появиться сообщение *"WS Сервер Запущен по адресу: ws://localhost:8765"*

### 1.2. Создание WS клиента на JavaScript

- Создать HTML-файл `ws-client.html`
- Скопировать в него следующий код:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>WebSocket Test</title>
</head>
<body>
    <script>
        const socket = new WebSocket('ws://localhost:8765');

        socket.onopen = () => {
            console.log('Соединение установлено');
            socket.send('Привет, сервер!');
        };

        socket.onmessage = (event) => {
            console.log('Сообщение от сервера:', event.data);
        };

        socket.onerror = (error) => {
            console.log('Ошибка:', error);
        };

        socket.onclose = () => {
            console.log('Соединение закрыто');
        };

        // socket.close(1000, 'Пользователь вышел'); // Закрытие подключения
    </script>
</body>
</html>
```
- `html` здесь нужен исключительно как контейнер для `js`-код,  поэтому разбираем только `js`-код:

    - Создание WebSocket-подключения:
        
        `const socket = new WebSocket('ws://localhost:8765');`

    - Открывает `WebSocket`-соединение с сервером, работающим на `localhost` (порт 8765).

    - Обработчик события `onopen` (когда соединение установлено):
        ```
        socket.onopen = () => {
            console.log('Соединение установлено');
            socket.send('Привет, сервер!');
        };
        ```
    - Выводит в консоль сообщение о подключении.

    - Отправляет строку "Привет, сервер!" серверу после установления соединения.

    - Обработчик события onmessage (при получении данных от сервера) :
        ```
        socket.onmessage = (event) => {
            console.log('Сообщение от сервера:', event.data);
        };
        ```
        - принимает сообщение от сервера и выводит его в консоль
        - `event.data` содержит данные, полученные от сервера.

    - Обработчик события onerror (если произошла ошибка):
        ```
        socket.onerror = (error) => {
            console.log('Ошибка:', error);
        };
        ```
        - Выводит ошибку WebSocket-соединения в консоль.

    - Обработчик события onclose (когда соединение закрывается):
        ```
        socket.onclose = () => {
          console.log('Соединение закрыто');
        };
        ```
        - Выводит в консоль сообщение о закрытии соединения.

    - Закрытие соединения вручную (закомментировано):

        `// socket.close(1000, 'Пользователь вышел');  // Закрытие подключения`
        - Если раскомментировать, вызов `socket.close()` закроет соединение.
      
- Подключение клиента к серверу произойдёт автоматически после открытия html-файла.
- Соответствующие сообщения можно будет увидеть в консоли браузера и в терминале PyCharm
- Там же в инспекторе можно будет увидеть заголовки, соответствующие WS подключению
- В консоли браузера можно будет самостоятельно отправить на сервер сообщения:
    - `socket.send('Текст вашего сообщения!');`


## 2. Создание WS Клиента на JavaScript для подключения к внешнему серверу

Для этой цели можно создать html-страницу, которая сможет после открытия автоматически подключится к серверу по адресу `wss://echo.websocket.org`.

Меняем только адрес. Всё остальное аналогично предыдущему коду.

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>WebSocket Test</title>
</head>
<body>
    <script>
        const socket = new WebSocket('wss://echo.websocket.org:');

        socket.onopen = () => {
            console.log('Соединение установлено');
            socket.send('Привет, сервер!');
        };

        socket.onmessage = (event) => {
            console.log('Сообщение от сервера:', event.data);
        };

        socket.onerror = (error) => {
            console.log('Ошибка:', error);
        };

        socket.onclose = () => {
            console.log('Соединение закрыто');
        };

        // socket.close(1000, 'Пользователь вышел');  // Закрытие подключения
    </script>
</body>
</html>
```