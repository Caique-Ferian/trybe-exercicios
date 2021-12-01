function verificaFimPalavra(word,ending){
    let palavra=word.split('').reverse().join('');
    let finalDaPalavra =ending.split('').reverse().join('');
    let igual;

    for(let index=0;index<finalDaPalavra.length;index+=1){
        if(palavra[index]!==finalDaPalavra[index]){
            igual=false;
            break;
        }else{
            igual=true;
        }

    }

    
    return igual;
    
}
let result = verificaFimPalavra('trybe','be');
console.log(result);
result = verificaFimPalavra('joaofernando','fernan');
console.log(result);