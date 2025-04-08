# Promise

**Promise** — это объект, представляющий завершающееся в будущем (или не завершающееся) асинхронное действие.
Он позволяет писать асинхронный код так, будто он синхронный, избегая "callback hell".

## Структура Promise

```
let promise = new Promise((resolve, reject) => {
  // асинхронная операция
});

    resolve(value) — вызвать, если операция успешна.

    reject(error) — вызвать, если произошла ошибка.
```

## Состояния Promise

| Состояние  | Описание                                |
|------------|------------------------------------------|
| `pending`  | ожидание — начальное состояние           |
| `fulfilled`| выполнен — вызван `resolve()`            |
| `rejected` | отклонён — вызван `reject()`             |



## Работа с Promise: `.then()`, `.catch()`, `.finally()`

```
new Promise((resolve, reject) => {
  setTimeout(() => resolve("Готово!"), 1000);
})
.then(result => {
  console.log(result); // "Готово!"
})
.catch(error => {
  console.error("Ошибка:", error);
})
.finally(() => {
  console.log("Операция завершена (успешно или с ошибкой)");
});

```

Конструкцию JS `then-catch-finally` можно считать функциональным аналогом Python-варианта `try-except-finally`, но с важными отличиями.

### Сравнение `JS then-catch-finally` и Python `try-except-finally`

| **Особенность**                 | **try-except-finally (Python) / try-catch-finally (JS с async)** | **then-catch-finally (Promises)**                        |
|--------------------------------|------------------------------------------------------------------|----------------------------------------------------------|
| **Стиль**                      | Синхронный (или синтаксический сахар в async/await)              | Асинхронный, основан на колбэках и цепочках              |
| **Область действия**           | Охватывает всё тело try                                          | Работает только в цепочке промисов                       |
| **Обработка ошибки**           | except (или catch)                                               | .catch()                                                 |
| **Гарантированное выполнение** | finally                                                          | .finally()                                               |
| **Порядок выполнения**         | Линейный, сверху вниз                                            | По цепочке .then().then().catch()                        |
| **Ошибки синхронные**          | Перехватывает                                                    | .catch() не видит синхронные ошибки вне промиса          |
| **Ошибки в асинхронном коде**  | Нужно использовать try/await                                     | .catch() создан именно для этого                         |




## Promise chaining (цепочка промисов)

Используется в случае, когда нужно последовательно сделать несколько вызовов,  
когда каждый последующий вызов использует результаты предыдущего.

### Пример
Представим ситуацию, когда мы делаем запросы к серверу для получения данных, и каждый шаг зависит от результата предыдущего.  
Например, мы получаем информацию о пользователе, затем запрашиваем список его заказов, а после этого — детали каждого заказа:
- Получаем информацию о пользователе.
- Получаем список заказов этого пользователя.
- Получаем детали каждого из заказов.

```
// Эмуляция асинхронных запросов
function getUserInfo(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('User data retrieved');
      resolve({ userId, name: 'John Doe' }); // возвращаем данные о пользователе
    }, 1000);
  });
}

function getOrders(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Orders data retrieved for user', userId);
      resolve([ { orderId: 1, amount: 50 }, { orderId: 2, amount: 100 } ]); // возвращаем список заказов
    }, 1000);
  });
}

function getOrderDetails(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Details retrieved for order', orderId);
      resolve({ orderId, items: ['item1', 'item2'], total: 150 }); // возвращаем детали заказа
    }, 1000);
  });
}

// Запуск цепочки промисов
getUserInfo(1)
  .then(userInfo => {
    console.log('User info:', userInfo);
    return getOrders(userInfo.userId);  // Используем данные о пользователе для запроса заказов
  })
  .then(orders => {
    console.log('Orders:', orders);
    return getOrderDetails(orders[0].orderId);  // Получаем детали первого заказа
  })
  .then(orderDetails => {
    console.log('Order details:', orderDetails);
  })
  .catch(error => {
    console.error('Error:', error);  // Обработка ошибок на любом шаге
  });
```

#### Разбор примера:

- `getUserInfo(1)`:
  - Мы начинаем с того, что вызываем функцию для получения информации о пользователе с ID 1.
  - Через 1 секунду, используя setTimeout, мы получаем информацию о пользователе (например, его имя) и возвращаем её через resolve().
  - После этого `.then(userInfo => { ... }) `выполняет обработку полученных данных о пользователе.

- `getOrders(userInfo.userId)`:
  - Когда получены данные о пользователе, мы используем эти данные для запроса его заказов через `getOrders(userInfo.userId)`.
  - Функция getOrders возвращает список заказов, который передается в следующий `.then()`.

- `getOrderDetails(orders[0].orderId):`
  - Когда список заказов получен, мы запрашиваем детали первого заказа, вызывая `getOrderDetails(orders[0].orderId)`.
  - Функция возвращает информацию о деталях заказа, и эта информация передается в последний `.then()`.

- Обработка ошибок:
  - Eсли на любом из шагов произойдёт ошибка, она будет поймана в блоке `.catch()` и выведена в консоль.


## Дополнительно ❌ Обработка ошибок

### 1. Ошибки можно обрабатывать с помощью `.catch()`:

```
new Promise((_, reject) => {
  reject("Произошла ошибка");
})
.catch(error => {
  console.error(error); // "Произошла ошибка"
});
```

### Или принудительно вызывать и перехватывать исключения (аналог raise в Python):
```
new Promise(() => {
  throw new Error("Ошибка!");
})
.catch(error => {
  console.error(error.message); // "Ошибка!"
});
```

## Promise и `async/await`

async-функции всегда возвращают Promise, а `await` — это "синтаксический сахар" для .`then():`

Для лучшего понимания решим предыдущую задачу с помощью `async/await`

```
// Эмуляция асинхронных запросов
function getUserInfo(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('User data retrieved');
      resolve({ userId, name: 'John Doe' }); // возвращаем данные о пользователе
    }, 1000);
  });
}

function getOrders(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Orders data retrieved for user', userId);
      resolve([ { orderId: 1, amount: 50 }, { orderId: 2, amount: 100 } ]); // возвращаем список заказов
    }, 1000);
  });
}

function getOrderDetails(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Details retrieved for order', orderId);
      resolve({ orderId, items: ['item1', 'item2'], total: 150 }); // возвращаем детали заказа
    }, 1000);
  });
}

// Функция для выполнения всех задач с async/await
async function runTasks() {
  try {
    // Получаем данные о пользователе
    const userInfo = await getUserInfo(1);
    console.log('User info:', userInfo);

    // Получаем заказы пользователя
    const orders = await getOrders(userInfo.userId);
    console.log('Orders:', orders);

    // Получаем детали первого заказа
    const orderDetails = await getOrderDetails(orders[0].orderId);
    console.log('Order details:', orderDetails);

  } catch (error) {
    console.error('Error:', error);  // Обработка ошибок
  }
}

// Запуск функции
runTasks();
```





## Полезные методы Promise

### `Promise.all([p1, p2, ...])`

Ждёт завершения всех промисов.

```
Promise.all([
  fetch('/user.json'),
  fetch('/profile.json')
]).then(responses => {
  console.log("Все запросы завершены");
});
```

### `Promise.race([p1, p2, ...])`

Срабатывает, как только первый Promise выполнится или отклонится.


### `Promise.allSettled([p1, p2, ...])`

Ждёт завершения всех, даже если некоторые отклонены.


### `Promise.any([p1, p2, ...])`

Ждёт первого успешного Promise (игнорирует ошибки).



## Когда использовать Promise?

Когда предстоит работа с "медленными" ресурсами: 

- При работе с сетевыми запросами (`fetch`, `axios`)
- При таймерах (`setTimeout`)
- При чтении файлов (например, `fs.promises` в `Node.js`)
- При загрузке внешних ресурсов (изображения, скрипты и т.д.)