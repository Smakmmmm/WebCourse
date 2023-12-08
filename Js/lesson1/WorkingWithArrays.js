(function () {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7];

    numbersArray.sort(function (e1, e2) {
        return e2 - e1;
    });
    console.log(numbersArray);

    const subarrayFromBeginning = numbersArray.slice(0, 5);
    console.log(subarrayFromBeginning);

    const subarrayFromEnd = numbersArray.slice(-5);
    console.log(subarrayFromEnd);

    const evenNumberSum = numbersArray.reduce((sum, current) => sum + current * !(current & 1), 0);
    console.log(evenNumberSum);

    const arrayLength = 100;
    const bigNumbersArray = Array.from({length: arrayLength}, (_, i) => ++i);
    console.log(bigNumbersArray);

    const evenNumbersSquares = bigNumbersArray.filter((number) => !(number & 1)).map((number) => number * number);
    console.log(evenNumbersSquares);
})();