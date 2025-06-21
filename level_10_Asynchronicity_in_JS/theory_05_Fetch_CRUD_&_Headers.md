# CRUD и заголовки для Fetch API

 CRUD — это аббревиатура из четырёх основных операций с данными:

| CRUD операция | HTTP метод     | Назначение                                  |
|---------------|----------------|----------------------------------------------|
| Create        | POST           | Создание нового ресурса                     |
| Read          | GET            | Получение (чтение) ресурса                  |
| Update        | PUT / PATCH    | Обновление существующего ресурса           |
| Delete        | DELETE         | Удаление ресурса                           |


Такой подход лежит в основе REST API.  
Например: 
- чтобы создать нового пользователя — отправляется POST /users, 
- чтобы получить его — GET /users/1, 
- обновить — PUT /users/1, 
- а удалить — DELETE /users/1.  
- Это делает взаимодействие между клиентом (через fetch) и сервером логичным и предсказуемым.


## 📥 1. GET-запрос (включая приём заголовков)

```
fetch('https://httpbin.org/get', {
    method: 'GET',
    // отправляем запрос с собственными заголовками
    headers: {
        'Accept': 'application/json',
        'X-Custom-Header': 'HelloWorld'
    }
})
    .then(res => {
        console.log('Response:', res);
        console.log('Response headers:');
        for (let [key, value] of res.headers) {
            console.log(`${key}: ${value}`);
        }
        return res.json();
    })
    .then(data => console.log('Response body:', data))
    .catch(error => console.error('Error:', error));
```

## 📤 2. POST-запрос (с JSON-данными и заголовками)

```
fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer my-token'
    },
    body: JSON.stringify({
        name: 'Alice',
        age: 25
    })
})
    .then(res => res.json())
    .then(data => console.log('POST response:', data))
    .catch(err => console.error('Error:', err));
```

## ✏️ 3. PUT-запрос (обновление данных)

```
fetch('https://httpbin.org/put', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: 123,
        status: 'updated'
    })
})
    .then(res => res.json())
    .then(data => console.log('PUT response:', data))
    .catch(error => console.error('Error:', error));
```

## ❌ 4. DELETE-запрос
```
fetch('https://httpbin.org/delete', {
    method: 'DELETE',
    headers: {
        'Authorization': 'Bearer delete-me'
    }
})
    .then(res => res.json())
    .then(data => console.log('DELETE response:', data))
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

fetch('https://httpbin.org/post', {
    method: 'POST',
    body: formData
})
    .then(res => res.json())
    .then(data => console.log('FormData response:', data))
    .catch(error => console.error('Error:', error));
```




## 🔄 Получение всех заголовков из ответа
```
fetch('https://httpbin.org/headers')
    .then(res => {
        console.log(`res:`, res);
        console.log(`=== Заголовки, принятые от сервера: ===`);
        for (const [key, value] of res.headers.entries()) {
            console.log(`${key}: ${value}`);
        }
        return res.json();
    })
    .then(data => {
        console.log('Body:', data);
        console.log(`=== Наши заголовки, отправленные на сервер (и вернувшиеся оттуда): ===`);
        for (const [key, value] of Object.entries(data.headers)) {
                console.log(`${key}: ${value}`);
            }
    });
```
Ответ возвращает не только заголовки сервера `res.headers`, но заголовки, которые браузер отправляет на сервер с запросом `data.headers)`.

| Что           | Где содержится            | Что показывает                                        | Простой образ                      |
|----------------|---------------------------|--------------------------------------------------------|------------------------------------|
| `res.headers`  | Мета-данные HTTP-ответа   | Заголовки, которые **сервер вернул** клиенту          | «Что сказал сервер»               |
| `data.headers` | В теле JSON-ответа        | Заголовки, которые **браузер отправил** на сервер     | «Что мы сказали серверу, и он это записал в блокнотик» |
