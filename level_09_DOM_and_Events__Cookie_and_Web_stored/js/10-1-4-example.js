//          HTML код:
// <label htmlFor="myInput">Введите текст:</label>
// <input type="text" id="myInput" value=""/>

// Этот обработчик полезен для отслеживания ввода информации в input
document.getElementById("myInput").addEventListener("input", function (event) {
    console.log("Новое значение:", event.target.value);
});