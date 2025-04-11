fetch("https://catfact.ninja/fact")
    .then(response => {
        if (!response.ok) throw new Error("Ошибка HTTP: " + response.status);
        return response.json();
    })
    .then(data => {
        console.log("Факт о коте:", data.fact);
        document.getElementById('response-3').innerHTML += `<p>🐱 ${data.fact}</p>`;
    })
    .catch(error => {
        console.error("Ошибка запроса:", error);
    });