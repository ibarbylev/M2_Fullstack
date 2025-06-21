// Этот обработчик полезен для отслеживания нажатия клавиш

document.addEventListener("keydown", function (event) {
    console.log(`Нажата клавиша: ${event.key} (${event.code})`);
});