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