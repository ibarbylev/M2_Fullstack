# Axios ("аксиос") СRUD и заголовки

**Axios** — это популярная библиотека для работы с HTTP-запросами в JavaScript.
Создана в 2014 разработчиком Matt Zabriskie для упрощения процесса отправки асинхронных запросов как в браузерах, так и на сервере(Node.js). 

**Axios** — это клиент HTTP для JavaScript, который использует `Promise` для обработки асинхронных запросов. Его основные особенности:

- Поддержка GET, POST, PUT, DELETE и других HTTP-методов.
- Преобразование данных: автоматически преобразует JSON-ответы в объект JavaScript.
- Поддержка отмены запросов через API для отмены.
- Поддержка заголовков и конфигурации запросов.
- Лёгкая интеграция с interceptors для обработки запросов или ответов до их получения.
- Поддержка кросс-доменных запросов (CORS).

| **Особенность**                  | **Axios**                                | **Fetch**                                                            |
|----------------------------------|------------------------------------------|----------------------------------------------------------------------|
| **Поддержка браузеров**          | Поддерживает старые браузеры (например, IE 11) | Только современные браузеры, требуется полифилл для старых           |
| **Поддержка Node.js**            | Да                                       | Нет (нужен полифилл)                                                 |
| **Обработка ошибок**             | Автоматически выбрасывает исключение для HTTP ошибок (4xx, 5xx) | Не выбрасывает исключение для ошибок, нужно вручную проверять статус |
| **Поддержка отмены запроса**     | Встроенная поддержка с использованием Cancel Token | Нужно использовать `AbortController`                                 |
| **Простота работы с JSON**       | Автоматически парсит JSON-ответы         | Требуется вручную парсить `response.json()`                          |
| **Поддержка конфигурации запроса**| Да, передаются заголовки, тайм-ауты и другие параметры в конфигурации | Да, через второй аргумент в `fetch()`                                |
| **Обработка заголовков**         | Автоматическая обработка заголовков, например `Content-Type` | Нужно вручную устанавливать заголовки                                |
| **Интерсепторы**                 | Есть поддержка интерсепторов для обработки запросов и ответов | Нет стандартной поддержки интерсепторов                              |
| **Удобство API**                 | Простое API с методами для GET, POST, PUT и DELETE | Чистое API, но требует больше кода для некоторых случаев             |
| **Работа с куками**              | Автоматическая работа с куками в браузере | Требуется настройка с помощью `credentials`                          |
| **Поддержка CORS**               | Да, в зависимости от конфигурации       | Да, через настройку `mode`                                           |
| **Размер библиотеки**            | Небольшой (около 20-30 KB)               | Встроенный в браузеры (нет дополнительных зависимостей)              |
| **Полифиллы**                    | Не требуется                             | Полифиллы необходимы для старых браузеров                            |

 **Интерсепторы** (interceptors) - это функции, которые позволяют перехватывать и изменять запросы или ответы до того, как они будут отправлены или обработаны.
Интерсепторы могут быть полезны для:

- Добавления общих заголовков (например, авторизации) ко всем запросам.
- Логирования запросов и ответов.
- Обработки ошибок, например, перенаправления пользователя в случае получения ошибки авторизации.
- Модификации данных перед отправкой или после получения.


**Полифилл** (polyfill) — это код (обычно в виде библиотеки или скрипта), который добавляет поддержку новых функций JavaScript в старых браузерах, которые эти функции не поддерживают.   


## 📥 1. GET-запрос (включая приём заголовков)

```
axios.get('https://httpbin.org/get', {
    // отправляем запрос с собственными заголовками
    headers: {
        'Accept': 'application/json',
        'X-Custom-Header': 'HelloWorld'
    }
})
    .then(response => {
        console.log('Response:', response);
        console.log('Response headers:');
        for (let [key, value] of Object.entries(response.headers)) {
            console.log(`${key}: ${value}`);
        }
        console.log('Response body:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

## 📤 2. POST-запрос (с JSON-данными и заголовками)

```
axios.post('https://httpbin.org/post', {
    name: 'Alice',
    age: 25
}, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer my-token'
    }
})
    .then(response => {
        console.log('POST response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

## ✏️ 3. PUT-запрос (обновление данных)

```
axios.put('https://httpbin.org/put', {
    id: 123,
    status: 'updated'
}, {
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        console.log('PUT response:', response.data);
    })
    .catch(error => { console.error('Error:', error));

```

## ❌ 4. DELETE-запрос
```
axios.delete('https://httpbin.org/delete', {
    headers: {
        'Authorization': 'Bearer delete-me'
    }
})
    .then(res => {
        console.log('HTTP Status:', res.status);
        console.log('DELETE response:', res.data);
    })
    .catch(error => console.error('Error:', error));

```

## 🧾 5. Отправка FormData

### 📦 Что такое FormData?

**FormData** — это специальный объект в JavaScript, который используется для отправки данных в формате `multipart/form-data`.    
Чаще всего используется при отправке HTML-форм, особенно если в них есть файлы (например, изображения, документы и т.п.).

**FormData**  позволяет удобно добавлять пары ключ–значение, включая файлы, и отправлять их через `fetch` или `XMLHttpRequest`.
```
const formData = new FormData();
formData.append('username', 'bob');
formData.append('file', new Blob(['Hello World'], {type: 'text/plain'}), 'hello.txt');

axios.post('https://httpbin.org/post', formData)
    .then(response => {
        console.log('FormData response:', response.data);
    })
    .catch(error => console.error('Error:', error));

```


## 🔄 Получение всех заголовков из ответа
```
axios.get('https://httpbin.org/headers')
    .then(response => {
        console.log('=== Заголовки, принятые от сервера: ===');
        for (const [key, value] of Object.entries(response.headers)) {
            console.log(`${key}: ${value}`);
        }
        console.log('Body:', response.data);
        console.log('=== Наши заголовки, отправленные на сервер (и вернувшиеся оттуда): ===');
        for (const [key, value] of Object.entries(response.data.headers)) {
            console.log(`${key}: ${value}`);
        }
    })
    .catch(error => console.error('Error:', error));
```
Ответ возвращает не только заголовки сервера `res.headers`, но заголовки, которые браузер отправляет на сервер с запросом `data.headers)`.

| Что                | Где содержится            | Что показывает                                        | Простой образ                      |
|--------------------|---------------------------|-------------------------------------------------------|------------------------------------|
| `res.headers`      | Мета-данные HTTP-ответа   | Заголовки, которые **сервер вернул** клиенту          | «Что сказал сервер»               |
| `res.data.headers` | В теле JSON-ответа        | Заголовки, которые **браузер отправил** на сервер     | «Что мы сказали серверу, и он это записал в блокнотик» |
