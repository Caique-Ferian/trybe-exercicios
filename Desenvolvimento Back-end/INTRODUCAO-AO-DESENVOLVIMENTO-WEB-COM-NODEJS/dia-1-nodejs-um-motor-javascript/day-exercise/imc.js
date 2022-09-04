const imc = (peso,altura) => peso/(altura*altura);
const answer = (value) => {
    if(value < 18.5) {
        console.log(`Seu IMC é: ${value}`);
        console.log("Você está Abaixo do peso (Magreza)!");
        return ;
    }
    if(value >=18.5 && value <= 24.9){ 
        console.log(`Seu IMC é: ${value.toFixed(2)}`);
        console.log("Você tem o peso Normal!");
        return ;
    }
    if(value >=25 && value <= 29.9){
        console.log(`Seu IMC é: ${value.toFixed(2)}`);
        console.log("Você está Acima do peso (Sobrepeso)!");
        return ;
    }
    if (value >=30 && value <= 34.9){
        console.log(`Seu IMC é: ${value.toFixed(2)}`);
        console.log("Obesidade grau I!");
        return ;
    }
    if (value >=35 && value <= 39.9){
        console.log(`Seu IMC é: ${value.toFixed(2)}`);
        console.log("Obesidade grau II!");
        return ;
    }
    if (value >=40){
        console.log(`Seu IMC é: ${value.toFixed(2)}`);
        console.log("Obesidade grau III e IV!");
        return ;
    }
    else 
        console.log("IMC não registrado.");
};
module.exports = {
    imc,
    answer,
};