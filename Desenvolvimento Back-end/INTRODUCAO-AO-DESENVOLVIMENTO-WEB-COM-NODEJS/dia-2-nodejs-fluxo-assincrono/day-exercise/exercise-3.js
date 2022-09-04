const math = require('./exercise-1');

async function main() {
    const randomNumbers = {
        a: Math.floor(Math.random() * 100 + 1),
        b: Math.floor(Math.random() * 100 + 1),
        c: Math.floor(Math.random() * 100 + 1)
    };
    const { a,b,c } = randomNumbers;
    
    try {
        const value = await math(a,b,c);
        return console.log(value);
    } catch (e) {
        return console.error(e.message);
    }
    
}
// main();