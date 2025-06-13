// Получаем элемент с id="box"
const elem = document.getElementById("box");

// Изменение стиля: устанавливаем красный цвет текста
elem.style.color = "red";

// Изменение стиля: устанавливаем желтый цвет фона
elem.style.backgroundColor = "yellow";

// Добавление свойства с !important
// Метод setProperty позволяет установить стиль с возможностью добавления приоритета
elem.style.setProperty("font-size", "20px", "important");

