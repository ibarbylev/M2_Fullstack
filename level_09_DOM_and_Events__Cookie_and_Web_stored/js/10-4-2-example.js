// Остановка всплытия

document.getElementById('child-2').addEventListener('click', function(event) {
    console.log('Дочерний элемент был кликнут');
    event.stopPropagation(); // Останавливает всплытие
});