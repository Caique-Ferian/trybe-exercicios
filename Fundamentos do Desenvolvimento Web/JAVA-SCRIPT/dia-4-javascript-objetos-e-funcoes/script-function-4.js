function biggerArrayName(array){
    let biggerName='';
    for(let index=0;index<array.length;index+=1){
        if(biggerName.length<array[index].length){
            biggerName=array[index];
        }
    }
    return biggerName;
}
let result = biggerArrayName(['José', 'Lucas', 'Nádia', 'Fernanda', 'Cairo', 'Joana']);
console.log(result);