// Разворот порядка обработки с погружения на всплытие

// Обработчик на фазе захвата
document.getElementById('parent-4').addEventListener('click', function() {
    console.log('Родитель был кликнут (фаза захвата)');
}, true);

// Обработчик на фазе всплытия
document.getElementById('parent-4').addEventListener('click', function() {
    console.log('Родитель был кликнут (фаза всплытия)');
}, false);

document.getElementById('child-4').addEventListener('click', function() {
    console.log('Дочерний элемент был кликнут');
});