let megasena=[];

for(let preencher=0;preencher<6;preencher+=1){
    megasena.push(Math.floor(Math.random()*60)+1);
}
let gabriel = [7, 17, 34, 42, 48, 55];
let heitor = [4, 18, 24, 42, 48, 60];
let gian = [1, 2, 3, 4, 5, 6];

let jogos=[gabriel,heitor,gian];

for(let jogo of jogos){
    let acertos =0;
        for(let indexMega=0;indexMega<megasena.length;indexMega+=1){
            console.log('Megasena',megasena[indexMega]);
            for(let indexJogador=0;indexJogador<jogo.length;indexJogador+=1){
                if(megasena[indexMega]===jogo[indexJogador]){
                    console.log('Acertou');
                    acertos+=1;
                }
            }

        }
        console.log(acertos);
    }
