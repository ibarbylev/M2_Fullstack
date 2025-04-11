axios.post('https://httpbin.org/post', {
    name: 'Alice',
    age: 25
}, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer my-token'
    }
})
    .then(response => {
        console.log('POST response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });