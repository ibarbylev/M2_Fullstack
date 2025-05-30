// Получаем элемент с id="box"
const elem = document.getElementById("box");

// Удаление свойства background-color
// Если у элемента был установлен фон, он удалится
elem.style.removeProperty("background-color");

// Полная замена всех инлайн-стилей
// Все предыдущие стили, установленные через style, будут удалены и заменены этими
elem.style.cssText = "color: blue; border: 1px solid black;";
