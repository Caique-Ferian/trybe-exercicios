// Desafio 1
function compareTrue(bool1,bool2) {
  if(bool1===true && bool2===true){
    return true;
  }else{
    return false;
  }

}

// Desafio 2
function calcArea(base,height) {
  return (base*height)/2;
}

// Desafio 3
function splitSentence(phrase) {
  return phrase.split(' ');
  
}

// Desafio 4
function concatName(array) {
  let length= array.length;
  let concat=[];
  concat.push(array[length-1],array[length-length]);
  return concat.join(', ');
}
// Desafio 5
function footballPoints(wins,ties) {
  return (wins*3)+(ties);
}

// Desafio 6
function highestCount(array) {
  
  let highestNumber=-100;
  let repetingTimes=0;
  for(let indexHigher=0;indexHigher<array.length;indexHigher+=1){
    if(highestNumber<array[indexHigher]){
      highestNumber=array[indexHigher];     
  }
  }
  for(let index=0;index<array.length;index+=1){
    if(highestNumber===array[index]){
      repetingTimes+=1;
    }
  }
    return repetingTimes;
}
// Desafio 7
function catAndMouse(mouse,cat1,cat2) {
  let deltaCat1= Math.abs(cat1-mouse);
  let deltaCat2= Math.abs(cat2-mouse);
  if(deltaCat1>deltaCat2){
    return 'cat2';
  }else if(deltaCat2>deltaCat1){
    return 'cat1';
  }else{
    return 'os gatos trombam e o rato foge';
  }
}

// Desafio 8
function fizzBuzz(array) {
  let fizzBuzzString=[];
  for(let index=0;index<array.length;index+=1){
    if(array[index]%3===0 && array[index]%5===0){
      fizzBuzzString.push('fizzBuzz');
    } else if(array[index]%3===0){
      fizzBuzzString.push('fizz');
    } else if(array[index]%5===0){
      fizzBuzzString.push('buzz');
    } else{
      fizzBuzzString.push('bug!');
    }
  }
  return fizzBuzzString;
}

// Desafio 9
function encode(string) {
  let code=string.split('');
  for(let index=0;index<code.length;index+=1){
    if(code[index]==='a'){
      code[index]=1;
    }else if(code[index]==='e'){
      code[index]=2;
    }else if(code[index]==='i'){
      code[index]=3;
    }else if(code[index]==='o'){
      code[index]=4;
    }else if(code[index]==='u'){
      code[index]=5;
    }else {
      code[index]=code[index];
    }
  }
  return code.join('');
}
function decode(string) {
  let decoding=encode(string).split('');
  for(let index=0;index<decoding.length;index+=1){
    if(decoding[index]==='1'){
      decoding[index]='a';
    }else if(decoding[index]==='2'){
      decoding[index]='e';
    }else if(decoding[index]==='3'){
      decoding[index]='i';
    }else if(decoding[index]==='4'){
      decoding[index]='o';
    }else if(decoding[index]==='5'){
      decoding[index]='u';
    }else {
      decoding[index]=decoding[index];
    }
  }
  return decoding.join('');
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
