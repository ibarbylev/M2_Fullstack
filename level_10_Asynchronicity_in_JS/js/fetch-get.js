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