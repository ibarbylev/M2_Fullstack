// Функция для вычисления числа Фибоначчи
function fibonacci(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        const temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

// Обработчик сообщений от основного потока
onmessage = function(e) {
    const index = e.data; // Индекс числа Фибоначчи
    const result = fibonacci(index); // Вычисляем число Фибоначчи
    postMessage(result); // Отправляем результат обратно в основной поток
};
