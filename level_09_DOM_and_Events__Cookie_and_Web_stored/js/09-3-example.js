// Получаем таблицу стилей на странице
const sheet = document.styleSheets[0];
const rules = sheet.cssRules;
// (это может быть как внешний файл CSS, так и встроенный стиль на странице).

console.log("Всего правил:", rules.length);
console.log("Первое правило:", rules[0].selectorText);
console.log("Последнее правило:", rules[rules.length - 1].selectorText);

// Добавляем новое CSS-правило в конец таблицы стилей
// Правило: body { background-color: lightblue; }
// Метод insertRule добавляет новое правило на указанную позицию
sheet.insertRule(
            "body { background-color: lightblue; }",
            sheet.cssRules.length
        );

console.log("Всего правил:", rules.length);
console.log("Первое правило:", rules[0].selectorText);
console.log("Последнее правило:", rules[rules.length - 1].selectorText);

// удаляем старое правило из начала списка
sheet.deleteRule(0);

console.log("Всего правил:", rules.length);
console.log("Первое правило:", rules[0].selectorText);
console.log("Последнее правило:", rules[rules.length - 1].selectorText);
