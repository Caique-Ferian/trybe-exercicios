const angA= 60;
const angB=60;
const angC=60;
let triangulo = angA+angB+angC===180;

if(triangulo===false || angA<=0 || angB<=0 || angC<=0){
    console.log(triangulo, "soma dos ângulos maior que 180 graus ou ângulo inválido.");   
} else {
    console.log(triangulo);
}