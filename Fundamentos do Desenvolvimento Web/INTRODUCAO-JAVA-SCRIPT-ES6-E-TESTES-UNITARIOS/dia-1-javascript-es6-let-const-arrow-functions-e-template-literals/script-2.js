// const fatorial = num=> {
//     let fator=num;
//     for(let index=1;index<num;index+=1){
//         fator=fator*index;
//     }
//     return fator;
// }
// console.log(fatorial(4));

// const fatorial = num=>{
//     if(num<0){
//         return console.log("Impossivel calcular fatorial!");
//     }else{
//         return num===0 ? 1 : num*fatorial(num-1);//4*3*2*1
//     }
// }
// console.log(fatorial(4));
const longestWord=frase=>{
   const arraySplit=frase.split(' ');
   let biggerWord='';
   for(let index=0;index<arraySplit.length;index+=1){
       for(let i=0;i<arraySplit.length;i+=1){
           if(arraySplit[index].length>arraySplit[i].length){
               biggerWord=arraySplit[index];
           }
       }
   }
   return biggerWord;
}
console.log(longestWord('Antônio foi no banheiro e não sabemos o que aconteceu'));