const skills=['HTML','CSS','JAVASCRIPT','Autodidata','Persistencia'];
const searchingForX= (stringX , string)=>{
    const stringSplit=stringX.split(' ');
    for(let index=0;index<stringSplit.length;index+=1){
        if(stringSplit[index]==='x'){
            stringSplit[index]=string;
        }
    }
    return stringSplit.join(' ');

}
const mergingFunction=(string,array)=>`${string} Minhas cinco principais habilidades sao: ${array.join()}`;
console.log(mergingFunction(searchingForX('Tryber x aqui!','Bebeto'),skills));