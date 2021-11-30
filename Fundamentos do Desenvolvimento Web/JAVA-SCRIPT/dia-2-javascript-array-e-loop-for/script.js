let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let soma=0;
let media;
let maiorValor=0;
let menorValor=100;
let impares=0;
let numbers2=[];
let numbers2Div=[];

for(let index=0;index<numbers.length;index+=1){
    console.log(numbers[index]);
    if(numbers[index]>maiorValor){
        maiorValor=numbers[index];
    }
    if(numbers[index]%2!==0){
        impares+=1;
    }
    if(numbers[index]<menorValor){
        menorValor=numbers[index];
    }
    if(numbers[index]<=25){
        numbers2.push(numbers[index]);
        numbers2Div.push(numbers[index]/2);
    }
    soma+=numbers[index];
}

console.log('Soma dos termos do Array =',soma);
media=soma/numbers.length;

if(media>20){
    console.log('Valor maior que 20');
    console.log('Media dos termos do Array =',media); 
}else {
    console.log('Valor menor ou igual a 20');
    console.log('Media dos termos do Array =',media); 
}

console.log('O maior valor do array e:',maiorValor);

console.log('Existem:',impares,'numeros impares no array')

console.log('O menor valor do array e:',menorValor);

console.log('Array de 1 ate 25:',numbers2);

console.log('Array de 1 ate 25 divididos por 2:',numbers2Div);