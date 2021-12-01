function highestArrayValue(array){
    let highestValueIndex=0;
    let highestValue=0;
    for(let index=0;index<array.length;index+=1){
        if(highestValue<array[index]){
            highestValue=array[index];
            highestValueIndex=index;
        }
    }
    return highestValueIndex;
}
let result = highestArrayValue([2,3,6,7,10,1]);
console.log(result);