document.addEventListener("copy", function (event) {
    console.log("Копирование запрещено!");
    event.preventDefault();
});