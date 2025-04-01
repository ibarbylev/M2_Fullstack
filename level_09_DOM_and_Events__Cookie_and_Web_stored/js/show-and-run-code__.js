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

function captureLogs(callback, idConsoleOutput) {
    let outputElement = document.getElementById(idConsoleOutput);
    if (!outputElement) {
        console.error(`Элемент #${idConsoleOutput} не найден!`);
        return;
    }

    let oldLog = console.log;
    outputElement.textContent = ""; // Очистка перед запуском нового кода

    console.log = function (...args) {
        outputElement.textContent += args.join(" ") + "\n";
        oldLog.apply(console, args); // Дублирование в DevTools
    };

    try {
        callback();
    } catch (error) {
        console.error("Ошибка при выполнении кода:", error);
    }

    console.log = oldLog; // Восстановление console.log
}

function runScript(filename, idConsoleOutput) {
    fetch(`js/${filename}`) //
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.status}`);
            }
            return response.text();
        })
        .then(jsCode => {
            captureLogs(() => {
                new Function(jsCode)(); // Выполняем загруженный код
            }, idConsoleOutput);
        })
        .catch(error => console.error("Ошибка загрузки скрипта:", error));
}