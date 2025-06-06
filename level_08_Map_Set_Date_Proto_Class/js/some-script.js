function memoize(func) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        console.log(key);  // [2]
        if (key in cache) {
            return cache[key];
        } else {
            const result = func(...args);
            cache[key] = result;
            return result;
        }
    };
}

const slowFunction = (num) => {
    console.log("Вычисление...");
    return num * 2;
};

const fastFunction = memoize(slowFunction);
console.log(fastFunction(2));
// "[2]"
// "Вычисление..."
// 4
console.log(fastFunction(2));  // 4 (из кеша)
// "[2]"
// 4
console.log(fastFunction(3));  // Вычисление... 6
// "[3]"
// "Вычисление..."
// 6
