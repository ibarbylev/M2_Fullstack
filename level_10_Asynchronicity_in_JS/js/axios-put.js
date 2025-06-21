axios.put('https://httpbin.org/put', {
    id: 123,
    status: 'updated'
}, {
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        console.log('PUT response:', response.data);  // Вывод для консоли в инспекторе
        console.log('PUT response:', JSON.stringify(response.data)); // Вывод для консоли на странице
        console.log('data.data:', response.data.data);  // Вывод данных из поля 'data'
    })
    .catch(error => console.error('Error:', error));
