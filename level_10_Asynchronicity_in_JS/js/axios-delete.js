axios.delete('https://httpbin.org/delete', {
    headers: {
        'Authorization': 'Bearer delete-me'
    }
})
    .then(res => {
        console.log('HTTP Status:', res.status);
        console.log('DELETE response:', res.data);
    })
    .catch(error => console.error('Error:', error));
