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
    .then(data => {
        console.log('PUT response:', (data));  // вывод для консоли в инспекторе
        console.log('PUT response:', JSON.stringify(data)); // вывод для консоли на странице
        console.log('data.data:', data.data);
    })
    .catch(error => console.error('Error:', error));