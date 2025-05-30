fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer my-token'
    },
    body: JSON.stringify({
        name: 'Alice',
        age: 25
    })
})
    .then(res => res.json())
    .then(data => console.log('POST response:', data))
    .catch(err => console.error('Error:', err));