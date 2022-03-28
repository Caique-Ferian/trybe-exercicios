function lowerArrayValue(array){
    let lowerValueIndex=0;
    let lowerValue=100;
    for(let index=0;index<array.length;index+=1){
        if(lowerValue>array[index]){
            lowerValue=array[index];
            lowerValueIndex=index;
        }
    }
    return lowerValueIndex;
}
let result = lowerArrayValue([2,4,6,7,10,0,-3]);
console.log(result);