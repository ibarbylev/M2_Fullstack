let elem = document.getElementById('content');

let styles = window.getComputedStyle(elem);
console.log("styles", styles); // Выведет реальный цвет элемента

console.log("elem.color:", styles.color); // Выведет реальный цвет элемента
console.log("elem.fontSize:", styles.fontSize); // Размер шрифта после всех стилей

for (let prop of styles) {
    let value = styles.getPropertyValue(prop);
    if (value) {
        console.log(`${prop}: ${value}`);
    }
}
