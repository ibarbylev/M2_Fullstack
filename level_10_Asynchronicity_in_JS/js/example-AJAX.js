$.ajax({
    url: "https://catfact.ninja/fact",
    method: "GET",
    success: function (data) {
        console.log("Факт о коте:", data.fact);
        document.getElementById('response-2').innerHTML += `<p>🐱 ${data.fact}</p>`;
    },
    error: function (xhr, status, error) {
        console.error("Ошибка:", error);
    }
});
