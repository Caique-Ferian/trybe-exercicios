const minimumForEach = (numbers) => {
    let min = 100000;

    numbers.forEach((n) => n < min ? min = n : n);
    return min;

}

console.log(minimumForEach([5, 9, 3, 19, 70, 8, 100, 2, 35, 27]));

const minimumForOf = (numbers) => {
    let min = 100000;

    for(const number of numbers) {
        if(number < min) min = number;
    }
    return min;

}

console.log(minimumForOf([5, 9, 3, 19, 70, 8, 100, 2, 35, 27]));