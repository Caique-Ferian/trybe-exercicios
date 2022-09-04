const {questionInt, question} = require('readline-sync');

const game = (answer) => {
    const randomNumber = Math.round(Math.random() * 10);
    if(answer === randomNumber) return console.log("Parabéns, número correto!");
    else console.log(`Opa, não foi dessa vez. O número era ${randomNumber}`);
}
const wannaPlay = () => {
    const playerNumber = questionInt("Informe um número de 0 à 10: ");
    game(playerNumber);
    const replay = question("Deseja jogar novamente? (Digite s para sim, e qualquer outra coisa para não) ");
    if (replay !== 's') return console.log("Fim de Jogo!");
    wannaPlay();
    
};

module.exports = wannaPlay;