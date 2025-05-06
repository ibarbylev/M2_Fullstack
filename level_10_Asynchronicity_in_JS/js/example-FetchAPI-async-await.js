async function getCatFact() {
    try {
        const response = await fetch('https://catfact.ninja/fact');
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log("Факт о коте 🐱:", data.fact);
        document.getElementById('response-4').innerHTML += `<p>🐱 ${data.fact}</p>`;
    } catch (error) {
        console.error('Ошибка при получении факта:', error);
    }
}

// Запускаем функцию
getCatFact();
