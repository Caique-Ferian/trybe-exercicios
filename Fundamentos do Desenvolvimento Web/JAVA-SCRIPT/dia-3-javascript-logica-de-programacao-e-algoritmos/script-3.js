let array = ['java', 'javascript', 'python', 'html', 'css'];
let maiorPalavra=array[0];
let menorPalavra=array[0];

for(let maior=0; maior<array.length;maior+=1){
    if(maiorPalavra.length< array[maior].length){
        maiorPalavra=array[maior];
    }
}
for(let menor=0; menor<array.length;menor+=1){
    if(menorPalavra.length> array[menor].length){
        menorPalavra=array[menor];
    }
}
console.log(maiorPalavra);
console.log(menorPalavra);