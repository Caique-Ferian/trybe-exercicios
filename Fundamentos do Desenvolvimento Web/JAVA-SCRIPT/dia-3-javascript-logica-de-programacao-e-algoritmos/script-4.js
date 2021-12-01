let maiorPrimo=0;

    for(let number=1;number<=50;number+=1){
        let primo=0;
        for(let divisor=1;divisor<=number;divisor+=1){
            if(number%divisor===0){
                primo+=1;
        }
    }
        if(primo===2 && maiorPrimo<number){
            maiorPrimo=number;
        }
}
console.log(maiorPrimo);