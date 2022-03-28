let peca= "torre";

 switch (peca.toLowerCase()){

    case 'cavalo': 
        console.log(peca.toLowerCase(), 'Se movimenta em L');
        break;

    case 'bispo': 
        console.log(peca.toLowerCase(), 'Se movimenta na diagonal');
        break;
   
    case 'torre': 
        console.log(peca.toLowerCase(), 'Se movimenta livremente');
        break;

    case 'rainha': 
        console.log(peca.toLowerCase(), 'Se movimenta como torre e bispo');
        break;
        
    case 'rei': 
        console.log(peca.toLowerCase(), 'Se movimenta uma casa para qualquer direcao');
        break;

    case 'peao': 
        console.log(peca.toLowerCase(), 'Se movimenta uma ou duas casas se for a primeira vez ou uma casa apenas nas demais jogadas');
        break;
    default :
        console.log('Peca invalida');
        break;
}