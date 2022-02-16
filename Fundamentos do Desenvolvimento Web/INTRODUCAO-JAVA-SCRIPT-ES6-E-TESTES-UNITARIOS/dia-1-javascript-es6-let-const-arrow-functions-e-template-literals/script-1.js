      const testingScope= escopo => {
        if (escopo === true) {
          var ifScope = 'Não devo ser utilizada fora do meu escopo (if)';
          ifScope = `${ifScope} ótimo, fui utilizada no escopo !`;
          console.log(ifScope);
        } else {
          var elseScope = 'Não devo ser utilizada fora meu escopo (else)';
          console.log(elseScope);
        }
        console.log(ifScope + ' o que estou fazendo aqui ? :O'); // Se necessário esta linha pode ser removida.
      }

      testingScope(true);

      // const oddsAndEvens = ()=>{
      //     const array= [13, 3, 4, 10, 7, 2];
      //     const arrayOrganizado=[];
      //     for(let index=0;index<array.length;index+=1){
      //       if(array[index]===2){
      //         arrayOrganizado[0]= array[index];
      //       }else if(array[index]===3){
      //         arrayOrganizado[1]=array[index];
      //       }else if(array[index]===4){
      //         arrayOrganizado[2]=array[index];
      //       }else if(array[index]===7){
      //         arrayOrganizado[3]=array[index];
      //       }else if(array[index]===10){
      //         arrayOrganizado[4]=array[index];
      //       }else {
      //         arrayOrganizado[5]=array[index];
      //       }
    
      //     }
      //     return arrayOrganizado;
      // };
      const comparaNumeros= (a,b)=> a-b;
      const array= [13, 3, 4, 10, 7, 2];//[3,13,4,10,7,2] [3,4,13,10,7,2],[3,4,10,13,7,2],[3,4,10,7,13,2],[3,4,10,7,2,13],[3,4,7,10,2,13],[3,4,7,2,10,13],[3,4,2,7,10,13],[3,2,4,7,10,13],[2,3,4,7,10,13].
      const oddsAndEvens = ()=> array.sort(comparaNumeros);
      // Seu código aqui.

      console.log(`Os números ${oddsAndEvens()} se encontram ordenados de forma crescente!`); // será necessário alterar essa linha 😉