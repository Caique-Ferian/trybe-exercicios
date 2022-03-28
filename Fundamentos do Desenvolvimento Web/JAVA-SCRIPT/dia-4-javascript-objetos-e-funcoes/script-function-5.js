function repetingNumber(array){
    let repeting=0;
    let number=0;
    for(let index=0;index<array.length;index+=1){
        let repetingTimes=0;
        for(let indexRepeat=0;indexRepeat<array.length;indexRepeat+=1){
            if(array[index]===array[indexRepeat]){
                repetingTimes+=1;
            }
        }
        if(repeting<repetingTimes){
            repeting=repetingTimes;
            number=array[index];
        }
    }
    return number;
}
let result = repetingNumber([2,3,2,5,8,2,3]);
console.log(result);