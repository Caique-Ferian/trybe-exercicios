let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let tripleNumbers=[];

for(let index=0; index<numbers.length;index+=1){

    if(index===9){
        tripleNumbers.push(numbers[index]*2);
    }else{
        tripleNumbers.push(numbers[index]*numbers[index+1]);
    }
}
console.log(tripleNumbers);

