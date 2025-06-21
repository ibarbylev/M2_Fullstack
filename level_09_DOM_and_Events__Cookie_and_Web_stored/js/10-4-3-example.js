// Обработка погружения или захвата:

// Обработчик на дедушку (верхний уровень) с фазой погружения
document.getElementById('grandparent-3').addEventListener('click', function(event) {
console.log('Grandparent clicked');
}, true); // true — это фаза погружения

// Обработчик на отца с фазой погружения
document.getElementById('parent-3').addEventListener('click', function(event) {
console.log('Parent clicked');
}, true);

// Обработчик на ребёнка с фазой погружения
document.getElementById('child-3').addEventListener('click', function(event) {
console.log('Child clicked');
}, true);

// Обработчик на кнопке с фазой погружения
document.getElementById('btn-3').addEventListener('click', function(event) {
console.log('Button clicked');
}, true);