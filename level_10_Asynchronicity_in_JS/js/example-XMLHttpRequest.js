const xhr = new XMLHttpRequest();
xhr.open("GET", "https://catfact.ninja/fact");

xhr.onload = function () {
    if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log("Факт о коте:", response.fact);
        document.getElementById('response-1').innerHTML += `<p>🐱 ${response.fact}</p>`;
    } else {
        console.error("Ошибка запроса:", xhr.status);
    }
};

xhr.onerror = function () {
    console.error("Сетевая ошибка");
};

xhr.send();
