const {questionInt} = require('readline-sync');
const fatorialCalc = (number) => {
    let fatorial = 1;
    for(let i = number; i >=1;i -= 1) {
        fatorial = fatorial*i;
    }
    return console.log(`O fatorial de ${number} é: ${fatorial}`);
}
const validation = () => {
    const number = questionInt("Informe o número que deseja saber à fatorial: ");
    if(number <= 0 ) {
        console.log("O número deve ser maior que 0!");
        validation();
    }
    else fatorialCalc(number);
}
validation();
module.exports = validation;