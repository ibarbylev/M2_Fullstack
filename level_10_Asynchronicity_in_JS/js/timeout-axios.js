document.getElementById('axiosButton').addEventListener('click', () => {
    axios.get('https://httpbin.org/get', { timeout: 5000 })
        .then(res => console.log('Response:', JSON.stringify(res, null, 2)))
        .catch(error => {
            if (error.code === 'ECONNABORTED') {
                console.error('Ошибка: Таймаут запроса');
            } else {
                console.error(`Ошибка: ${error.message}`);
            }
        });
});
