function resetOtherOutputs(exceptId) {
    document.querySelectorAll(".language-javascript").forEach(output => {
        if (output.id !== exceptId) {
            output.innerHTML = ""; // Очистка других блоков
        }
    });
}

function displayCode(filename, idRun) {
    resetOtherOutputs(idRun); // Сбрасывает все другие id
    fetch(`js/${filename}`) // 🔹 Теперь без `js/`, т.к. в `runScript` уже полный путь
        .then(response => response.text())
        .then(jsCode => {
            let codeBlock = document.getElementById(idRun);
            if (!codeBlock) {
                console.error(`Элемент #${idRun} не найден!`);
                return;
            }
            codeBlock.textContent = jsCode; // Вставляем код
            Prism.highlightElement(codeBlock); // Подсветка
        })
        .catch(error => console.error("Ошибка при загрузке файла:", error));
}

function runScript(filename, idConsoleOutput) {
    console.log("Запуск загрузки скрипта:", filename);

    fetch(`js/${filename}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.status}`);
            }
            console.log("Скрипт загружен успешно");
            return response.text();
        })
        .then(jsCode => {
            console.log("Запуск функции captureLogs с кодом", jsCode);
            captureLogs(() => {
                console.log("Выполнение скрипта...");
                new Function(jsCode)(); // Выполняем загруженный код
            }, idConsoleOutput);
        })
        .catch(error => {
            console.error("Ошибка загрузки скрипта:", error);
        });
}

function captureLogs(callback, idConsoleOutput) {
    const consoleElement = document.getElementById(idConsoleOutput);
    if (!consoleElement) {
        console.warn(`Элемент с id="${idConsoleOutput}" не найден.`);
        return;
    }

    console.log("Перехват консольных сообщений...");

    // Сохраняем оригинальные методы console
    const originalConsole = { ...window.console };

    // Переменная для защиты от рекурсии
    let isLogging = false;

    function appendMessage(type, message) {
        console.log(`Добавление сообщения в консоль: ${type}: ${message}`);
        const div = document.createElement("div");
        div.classList.add(type);
        div.textContent = message;
        consoleElement.appendChild(div);
    }

    // Переопределяем глобальный console
    window.console.log = (...args) => {
        if (isLogging) return; // Защита от рекурсии
        isLogging = true;
        originalConsole.log(...args);
        appendMessage("log", args.join(" "));
        isLogging = false;
    };

    window.console.error = (...args) => {
        if (isLogging) return; // Защита от рекурсии
        isLogging = true;
        originalConsole.error(...args);
        appendMessage("error", args.join(" "));
        isLogging = false;
    };

    window.console.warn = (...args) => {
        if (isLogging) return; // Защита от рекурсии
        isLogging = true;
        originalConsole.warn(...args);
        appendMessage("warn", args.join(" "));
        isLogging = false;
    };

    window.console.info = (...args) => {
        if (isLogging) return; // Защита от рекурсии
        isLogging = true;
        originalConsole.info(...args);
        appendMessage("info", args.join(" "));
        isLogging = false;
    };

    // Выполнение callback и сохранение восстановления в самом конце
    callback();

    // Восстановление оригинальных методов console после выполнения скрипта и клика
    const clickListener = () => {
        console.log("Восстановление оригинальных методов console...");
        window.console = originalConsole; // Восстановим оригинальные методы только после клика
        element.removeEventListener('click', clickListener); // Убираем обработчик клика
    };

    // Ждём клика на элемент
    const element = document.getElementById('mouse-click');
    if (element) {
        element.addEventListener('click', clickListener);
    } else {
        console.warn('Элемент для клика не найден.');
    }
}

