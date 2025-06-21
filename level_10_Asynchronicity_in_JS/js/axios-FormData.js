const formData = new FormData();
formData.append('username', 'bob');
formData.append('file', new Blob(['Hello World'], {type: 'text/plain'}), 'hello.txt');

axios.post('https://httpbin.org/post', formData)
    .then(response => {
        console.log('FormData response:', response.data);
    })
    .catch(error => console.error('Error:', error));