const controller = new AbortController();

axios.get('https://httpbin.org/get', {
    signal: controller.signal
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        if (axios.isCancel(error)) {
            console.log('Запрос отменён:', error.message);
        } else {
            console.error('Произошла ошибка:', error);
        }
    });

// Отмена запроса через 2 секунды
setTimeout(() => controller.abort(), 5000);
