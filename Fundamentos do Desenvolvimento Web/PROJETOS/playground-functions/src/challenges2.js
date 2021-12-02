// Desafio 10
function techList(array,name) {
  let techs=[];
  for(index=0;index<array.length;index+=1){
    let obj={};
    if(index===0){
      obj={
        tech: array[index+3],
        name: name,
      };
    }else if(index===1){
      obj={
        tech: array[index+1],
        name: name,
      };
    }else if(index===2){
      obj={
        tech: array[index+2],
        name: name,
      };
    }else if(index===3){
      obj={
        tech: array[index-2],
        name: name,
      };
    }else {
      obj={
        tech: array[index-4],
        name: name,
      };
    }
    
    techs.push(obj);
  }if(techs.length===0){
    return 'Vazio!';
  }else{
    return techs;
  }
}
// Desafio 11
function generatePhoneNumber(array) {
  if(array.length!==11){
    return 'Array com tamanho incorreto.';
  }else{
    let ddd=[];
    let tel1=[];
    let tel2=[];
    
    for(let index=0;index<array.length;index+=1){
      let repeat=0;
      for(let count=0;count<array.length;count+=1){
          if(array[index]===array[count]){
          repeat+=1;
          }
      }
      if(array[index]<0 || repeat>2 || array[index]>9){
        return 'não é possível gerar um número de telefone com esses valores';
        break;
      }else if(index===0 || index===1){
        ddd.push(array[index]);
      }else if(index>=2 && index<=6){
        tel1.push(array[index]);
      }else{
        tel2.push(array[index]);
      }
      
    }
    return '('+ ddd.join('') + ')' +' '+ tel1.join('') + '-' + tel2.join('');
  }
}

// Desafio 12
function triangleCheck(lineA,lineB,lineC) {
  if(lineA<(lineB+lineC)&& lineA>(Math.abs(lineB-lineC)) && lineB<(lineA+lineC)&& lineB>(Math.abs(lineA-lineC))&& lineC<(lineB+lineC)&& lineC>(Math.abs(lineB-lineC))){
    return true;
  }else{
    return false;
  }
}
// Desafio 13
function hydrate(string) {
  let drinks= string.split(' ');
  let water=0;
  for(index=0;index<drinks.length;index+=1){
    if(parseInt(drinks[index],10)>0){
      water=water+parseInt(drinks[index],10);
    }
  }if(water>1){
    return water+' copos de água';
  }else{
    return water+' copo de água';
  }
}
module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
