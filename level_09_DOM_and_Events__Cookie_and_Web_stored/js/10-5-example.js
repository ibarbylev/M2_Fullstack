const list = document.getElementById('list');
const addButton = document.getElementById('add');

// Делегирование событий: обработчик висит на <ul>
list.addEventListener('click', function(event) {
    // Проверяем, что клик был именно по <li>, а не по <ul>
    if (event.target.tagName === 'LI') {
        console.log('Клик по элементу:', event.target.textContent);
    }
});

// Добавляем новый элемент динамически
addButton.addEventListener('click', function() {
    const newItem = document.createElement('li');
    newItem.textContent = `Новый элемент ${list.children.length + 1}`;
    list.appendChild(newItem);
});