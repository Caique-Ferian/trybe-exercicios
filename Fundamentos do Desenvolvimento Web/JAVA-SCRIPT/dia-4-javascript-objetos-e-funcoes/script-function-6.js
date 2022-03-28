function sum(N){
    let sum=0;
    for(let index=1;index<N;index+=1){
        if(index===1){
            sum=N+index;
        }
        else{
            sum=sum+index;
        }
    }
    return sum;
}
let result = sum(10);
console.log(result);