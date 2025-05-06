// На этой странице находится элемент
// <div id="output"></div>
// Код ниже находит и выводит в консоль все его стили

let elem = document.getElementById('output');

let styles = window.getComputedStyle(elem);
console.log("styles", styles); // Выведет реальный цвет элемента

console.log("elem.color:", styles.color); // Выведет реальный цвет элемента
console.log("elem.fontSize:", styles.fontSize); // Размер шрифта после всех стилей

console.log("===== вывод всех ненулевых параметра стиля элемента с id='output':");
for (let prop of styles) {
    let value = styles.getPropertyValue(prop);
    if (value) {
        console.log(`${prop}: ${value}`);
    }
}
