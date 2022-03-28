const result = (bet,func)=>{
    const winner= Math.round(Math.random()*4 +1) ;//num aleatorio de 1 a 5
    if(func(bet,winner)){
        return "Parabéns você ganhou";
    }else{
        return  "Tente novamente";
    }
};

const verifyBet=(bet,winner)=>{
    if(bet === winner){
        return true;
    }else{
        return false;
    }
}

console.log(result(3,verifyBet));
