(function() {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7];
    console.log("Исходный массив:");
    console.log(numbersArray);

    (function sortArray() {
        numbersArray.sort(function (e1, e2) {
            return e2 - e1;
        });
        console.log("Отсортировали массив по убыванию:");
        console.log(numbersArray);
    })();

    (function getSubarrays() {
        const subarrayFromBeginning = numbersArray.slice(0, 5);
        console.log("Получили подмассив из первых 5 элементов:");
        console.log(subarrayFromBeginning);

        const subarrayFromEnd = numbersArray.slice(-5);
        console.log("Получили подмассив из последних 5 элементов:");
        console.log(subarrayFromEnd);
    })();

    (function getEvenNumbersSum() {
        const evenNumbersSum = numbersArray.reduce((sum, number) => sum + number * !(number%2), 0);
        console.log("Получили сумму четных чисел массива:");
        console.log(evenNumbersSum);
    })();
})();

(function() {
    const bigNumbersArray = [];

    (function fillArray() {
        for (let i = 1; i <= 100; i++) {
            bigNumbersArray.push(i);
        }

        console.log("Создали массив чисел от 1 до 100 через цикл for:");
        console.log(bigNumbersArray);
    })();

    (function getEvenNumbersSquares() {
        const evenNumbersSquares = bigNumbersArray.filter(number => !(number % 2)).map(number => number * number);
        console.log("Получили список квадратов четных чисел из массива:");
        console.log(evenNumbersSquares);
    })();
})();