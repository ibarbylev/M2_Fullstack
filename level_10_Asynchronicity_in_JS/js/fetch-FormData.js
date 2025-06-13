const formData = new FormData();
formData.append('username', 'bob');
formData.append('file', new Blob(['Hello World'], {type: 'text/plain'}), 'hello.txt');

fetch('https://httpbin.org/post', {
    method: 'POST',
    body: formData
})
    .then(res => res.json())
    .then(data => console.log('FormData response:', data))
    .catch(error => console.error('Error:', error));