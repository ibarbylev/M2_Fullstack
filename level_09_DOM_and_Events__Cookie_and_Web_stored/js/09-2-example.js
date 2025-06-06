// Получаем элемент с id="box"
const elem = document.getElementById("box-2");

// Добавить класс "active"
// Если у элемента еще нет этого класса, он будет добавлен
elem.classList.add("active");

// Удалить класс "hidden"
// Если у элемента есть этот класс, он будет удален;
// если нет — ничего не произойдет
elem.classList.remove("hidden");

// Переключить класс "highlight"
// Если у элемента есть этот класс, он удалится, если нет — добавится
elem.classList.toggle("highlight");

// Заменить класс "old-class" на "new-class"
// Если у элемента есть класс "old-class", он будет заменен на "new-class"
// Если "old-class" нет, ничего не изменится
elem.classList.replace("old-class", "new-class");

// Проверить наличие всех добавленных классов
// Метод contains() возвращает true, если класс присутствует, иначе false
console.log("Класс active?: ", elem.classList.contains("active")); // true или false
console.log("Класс hidden?: ", elem.classList.contains("hidden")); // true или false
console.log("Класс highlight?: ", elem.classList.contains("highlight")); // true или false
console.log("Класс old-class?: ", elem.classList.contains("old-class")); // true или false
console.log("Класс new-class?: ", elem.classList.contains("new-class")); // true или false
