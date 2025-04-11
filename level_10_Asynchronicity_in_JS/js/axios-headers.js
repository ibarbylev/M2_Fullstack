axios.get('https://httpbin.org/headers')
    .then(res => {
        console.log('Body:', res);
        console.log('=== Заголовки, принятые от сервера: ===');
        for (const [key, value] of Object.entries(res.headers)) {
            console.log(`${key}: ${value}`);
        }
        console.log('Body:', res.data);
        console.log('=== Наши заголовки, отправленные на сервер (и вернувшиеся оттуда): ===');
        for (const [key, value] of Object.entries(res.data.headers)) {
            console.log(`${key}: ${value}`);
        }
    })
    .catch(error => console.error('Error:', error));