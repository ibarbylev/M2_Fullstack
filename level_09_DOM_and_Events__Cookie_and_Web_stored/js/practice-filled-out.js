// Получим элемент с id="content"
const contentDiv = document.getElementById('content');

// Имя узла
console.log(contentDiv.nodeName); // DIV

// Тип узла
console.log(contentDiv.nodeType); // 1 (элемент)

// Получим текст внутри заголовка <h1>
const h1 = document.querySelector('h1');
console.log(h1.textContent); // Привет, мир!

// Получаем родительский элемент
console.log(h1.parentNode.nodeName); // DIV

// Получаем все дочерние элементы
const children = contentDiv.children;
console.log(children); // HTMLCollection [h1, p, ul]

// Изменим текст заголовка
h1.textContent = 'Добро пожаловать в мир JavaScript!';

// Изменим текст параграфа
const paragraph = document.querySelector('p');
paragraph.textContent = 'Это изменённый параграф.';

contentDiv.setAttribute('id', 'main-content');
console.log(contentDiv.id); // main-content

// Создадим новые элементы <p> и добавим его в начало и конец родительского элемента<div>
const newParagraphFirst = document.createElement('p');
newParagraphFirst.textContent = 'Новый параграф добавлен динамически!';
contentDiv.prepend(newParagraphFirst);

const newParagraphLast = document.createElement('p');
newParagraphLast.textContent = 'Новый параграф добавлен динамически!';
contentDiv.appendChild(newParagraphLast);

// Создадим новый элемент <ul> с несколькими <li> внутри
const newList = document.createElement('ul');
const newItem1 = document.createElement('li');
newItem1.textContent = 'Третий элемент списка';
const newItem2 = document.createElement('li');
newItem2.textContent = 'Четвертый элемент списка';

newList.appendChild(newItem1);
newList.appendChild(newItem2);

// Вставим новый список перед старым
contentDiv.insertBefore(newList, contentDiv.querySelector('ul'));

// Удалим первый элемент списка
const firstListItem = contentDiv.querySelector('ul').firstElementChild;
console.log(firstListItem);
contentDiv.querySelector('ul').removeChild(firstListItem);

// Удалим весь контент внутри первого ul
let firstUl = contentDiv.querySelector('ul');
console.log(firstUl); // Проверяем элемент до изменений
if (firstUl) {
    firstUl.replaceChildren();
}
console.log(firstUl); // Проверяем элемент после изменений

// Теперь удалим первый ul полностью
firstUl.remove();
console.log(firstUl);  // Нет ошибки, поскольку remove() удаляет элемент из структуры DOM
// но не из памяти
// Корректнее будет проверить, содержится ли удалённый элемент в структуре DOM:
console.log(document.body.contains(firstUl));  // false