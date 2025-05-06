const controller = new AbortController();
const signal = controller.signal;

fetch('https://httpbin.org/get', {signal}) // пример API
    .then(response => response.json())
    .then(data => console.log('Ответ:', data))
    .catch(error => {
        if (error.name === 'AbortError') {
            console.log('Запрос был отменён');
        } else {
            console.error('Произошла ошибка:', error);
        }
    });

// Отмена запроса через 2 секунды
setTimeout(() => controller.abort(), 5000);