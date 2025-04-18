// Примитивные виды данных

let stringVar = "Привет, мир!";
let numberVar = 42;
let floatVar = 3.14;
let bigIntVar = 9007199254740991n;
let booleanVar = true;
let undefinedVar;
let nullVar = null;
let symbolVar = Symbol("id");

console.log("вывод скрипта ===== js/02-variables-example.js =====");
console.log('stringVar', stringVar);
console.log('numberVar', numberVar);
console.log('floatVar', floatVar);
console.log('bigIntVar', bigIntVar);
console.log('booleanVar', booleanVar);
console.log('undefinedVar',  undefinedVar);
console.log('nullVar', nullVar);
console.log('symbolVar', symbolVar);

// Объекты
let objectVar = { name: "Иван", age: 30 };
let arrayVar = [1, 2, 3];
let functionVar = function() { console.log("Функция"); };
let dateVar = new Date();
let regexVar = /ab+c/;
let mapVar = new Map();
mapVar.set("key", "value");
let setVar = new Set([1, 2, 3]);
let promiseVar = new Promise((resolve) => resolve("done"));
let errorVar = new Error("Ошибка");

console.log(objectVar);
console.log(arrayVar);
console.log(functionVar);
console.log(dateVar);
console.log(regexVar);
console.log(mapVar);
console.log(setVar);
console.log(promiseVar);
console.log(errorVar);

console.log("конец скрипта ===== js/02-variables-example.js =====");
