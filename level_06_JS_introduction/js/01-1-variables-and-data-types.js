console.log("начало скрипта ===== js/01-variables-and-data-types.js =====");

// Глобальная переменная
var globalVar = "Я globalVar";
let globalLet = "Я globalLet";
const globalConst = 'Я globalConst';

function exampleFunction() {
    var functionVar = "Я functionVar";
    console.log("globalVar внутри функции exampleFunction",globalVar); // Доступно
    console.log("globalLet внутри функции exampleFunction",globalLet); // Доступно
    console.log("functionVar внутри функции exampleFunction", functionVar); // Доступно
}

if (true) {
    let blockLet = "Я blockLet";
    var blockVar = "Я blockVar";
    console.log("blockVar внутри блока: ", blockVar); // Доступно только в блоке
    console.log("blockLet внутри блока: ", blockLet); // Доступно только в блоке
    console.log("globalLet внутри блока: ", globalLet); // Доступно везде
}

exampleFunction();

console.log(globalVar); // Доступно
console.log(globalLet); // Доступно
try {
    console.log("functionVar ВНЕ функции exampleFunction: ", functionVar); // Доступно
} catch (error) {
    console.error("Ошибка:", error.message);
}
try {
    console.log("blockVar ВНЕ блока: ", blockVar); // Доступно
} catch (error) {
    console.error("Ошибка:", error.message);
}
try {
    console.log("blockLet ВНЕ блока: ", blockLet);
} catch (error) {
    console.error("Ошибка:", error.message);
}

// попытка изменить значение константы
try {
    globalConst = "newConst";
} catch (error) {
    console.error("Ошибка:", error.message);
}

console.log("конец скрипта ===== js/01-variables-and-data-types.js =====");
