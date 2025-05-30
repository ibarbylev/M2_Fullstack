document.getElementById('fetchButton').addEventListener('click', () => {
    const timeout = 5000;

    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Запрос превысил время ожидания')), timeout)
    );

    const fetchPromise = fetch('https://httpbin.org/get');

    Promise.race([fetchPromise, timeoutPromise])
        .then(response => response.json())
        .then(data => {
            console.log('output:', JSON.stringify(data, null, 2));
        })
        .catch(error => {
            console.error(`Ошибка: ${error.message}`);
        });
});
