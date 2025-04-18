// Создание кастомного события
const customEvent = new CustomEvent('myCustomEvent', {
  detail: { message: 'Привет, мир!' }
});

// Получение элемента по id
const element = document.getElementById('myElement');

// Добавление обработчика события myCustomEvent
element.addEventListener('myCustomEvent', (event) => {
  console.log('Событие произошло:', event.detail.message);
});

// Добавление обработчика события click
// Его срабатывание тут же  запускает событие myCustomEvent
element.addEventListener('click', () => {
  element.dispatchEvent(customEvent);
});
