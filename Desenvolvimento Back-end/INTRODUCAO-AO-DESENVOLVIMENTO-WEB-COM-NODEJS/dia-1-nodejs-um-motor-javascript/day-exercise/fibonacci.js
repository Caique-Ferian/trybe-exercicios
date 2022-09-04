const {questionInt} = require('readline-sync');
const fibonacciSequence = (length) => {
    let num1 = 1;
    let num2 = 1;
    for(let i = length; i > 0;i -= 1) {
         console.log(num2);
        const oldNumb = num1;
        num1 += num2;
        num2 = oldNumb;
    }
    return;
}
const validation = () => {
    const number = questionInt("Informe o tamanho da sequência de fibonacci: ");
    if(number <= 0 ) {
        console.log("O número deve ser maior que 0!");
        validation();
    }
    else fibonacciSequence(number);
}
validation();
module.exports = validation;