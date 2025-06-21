fetch('https://httpbin.org/headers')
    .then(res => {
        console.log(`res:`, res);
        console.log(`=== Заголовки, принятые от сервера: ===`);
        for (const [key, value] of res.headers.entries()) {
            console.log(`${key}: ${value}`);
        }
        return res.json();
    })
    .then(data => {
        console.log('Body:', data);
        console.log(`=== Наши заголовки, отправленные на сервер (и вернувшиеся оттуда): ===`);
        for (const [key, value] of Object.entries(data.headers)) {
                console.log(`${key}: ${value}`);
            }
    })
    .catch(error => console.error('Error:', error));