//Quando a resposta for correta a contagem sobe 1 ponto, quando for incorreta desce 0.5 pontos, e quando não houver resposta ("N.A") não altera-se a contagem.
const RIGHT_ANSWERS = ['A', 'C', 'B', 'D', 'A', 'A', 'D', 'A', 'D', 'C'];
const STUDENT_ANSWERS = ['A', 'N.A', 'B', 'D', 'A', 'C', 'N.A', 'A', 'D', 'B']; 

const evaluation = (answers,studentTest,func)=>{
   return func(answers,studentTest);
}

const verifyEvaluation=(answers,studentTest)=>{
    let total=0;
    for(let index=0; index<answers.length;index+=1){
        if(answers[index]===studentTest[index]){
            total+=1;
        }else if(studentTest[index]==='N.A'){
            total=total;
        }else{
            total-=0.5;
        }
    }
    return total;
}

console.log(evaluation(RIGHT_ANSWERS,STUDENT_ANSWERS,verifyEvaluation));