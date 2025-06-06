fetch('https://httpbin.org/delete', {
    method: 'DELETE',
    headers: {
        'Authorization': 'Bearer delete-me'
    }
})
    .then(res => {
        console.log('\'HTTP Status:', res.status);
        return res.json();
    })
    .then(data => console.log('DELETE response:', data))
    .catch(error => console.error('Error:', error));