const math = require('./exercise-1');

const randomNumbers = {
    a: Math.floor(Math.random() * 100 + 1),
    b: Math.floor(Math.random() * 100 + 1),
    c: Math.floor(Math.random() * 100 + 1)
};
const { a,b,c } = randomNumbers;

// math(a,b,c)
//     .then((resolve) => console.log(resolve))
//     .catch((e) => console.log(e.message));
