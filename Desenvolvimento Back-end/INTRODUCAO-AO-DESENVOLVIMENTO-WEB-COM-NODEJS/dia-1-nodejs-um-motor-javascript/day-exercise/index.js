const { questionFloat,questionInt, question } = require('readline-sync');
const scriptToExec = questionInt("Qual dos scripts deseja acionar: (1-imc, 2-velocidade, 3-sorteio, 4-fatorial ou 5-fibonacci)? ");
switch(scriptToExec) {
    case 1:
        const {imc,answer} = require('./imc');
        console.log("Script IMC: ");
        const peso = questionFloat("Qual seu peso? ");
        const altura = questionFloat("Qual sua altura? ");
        answer(imc(peso, altura));console.log(fatorialCalc(5));
        break;
    case 2:
        const velocity = require('./velocidade');
        console.log("Script Velocidade: ");
        const distance = questionInt("Qual à distância percorrida em Metros? ");
        const time = questionInt("Qual o tempo que levou para percorrer em Segundos? ");
        velocity(distance,time);
        break;
    case 3:
        const wannaPlay = require('./sorteio');
        wannaPlay();
        break;
    case 4:
        const fatorial = require('./fatorial');
        fatorial();
        break;
    case 5:
        const fibonacci = require('./fibonacci');
        fibonacci();
        break;
    default :
        console.log("Script inexistente no sistema!");
}