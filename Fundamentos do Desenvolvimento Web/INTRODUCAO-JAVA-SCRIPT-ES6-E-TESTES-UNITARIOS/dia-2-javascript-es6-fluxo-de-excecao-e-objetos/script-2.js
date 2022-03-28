const lesson1 = {
    materia: 'Matemática',
    numeroEstudantes: 20,
    professor: 'Maria Clara',
    turno: 'manhã',
  };
  
  const lesson2 = {
    materia: 'História',
    numeroEstudantes: 20,
    professor: 'Carlos',
  };
  
  const lesson3 = {
    materia: 'Matemática',
    numeroEstudantes: 10,
    professor: 'Maria Clara',
    turno: 'noite',
  }; 

  const shift= 'turno';
  const shiftValue='noite';

  const addShift=(object,key,value)=> object[key]=value;

  addShift(lesson2,shift,shiftValue);
//   console.log(lesson2);
const objectKeys=object=> Object.keys(object);
// console.log(objectKeys(lesson1));
const objectKeysLength=object=> Object.keys(object).length;
// console.log(objectKeysLength(lesson3));
const objectValues=object=> Object.values(object);
// console.log(objectValues(lesson1));
const allLessons= Object.assign({},{lesson1,lesson2,lesson3});
// console.log(allLessons);

const allLessonsStudents=object=> {
    let total=0;
    const array=Object.keys(object);
    for(key in array){
     total+=object[array[key]].numeroEstudantes;
    }
    return total;
}
// console.log(allLessonsStudents(allLessons));

const getValueByNumber=(object,pos)=>Object.values(object)[pos];
// console.log(getValueByNumber(lesson1, 1));

const verifyPair=(object,key,value)=>{
    const arrayEntries= Object.entries(object);
    let isEqual=false;
    for(let index in arrayEntries){
        if(arrayEntries[index][0]===key && arrayEntries[index][1]===value){
         isEqual=true;
        }
            return isEqual;
    }
}
// console.log(verifyPair(lesson1,'materia','Matemática'));

const allLessonsStudentsMath=object=> {
    let total=0;
    const array=Object.keys(object);
    for(key in array){
        if(object[array[key]].materia==='Matemática'){
            total+=object[array[key]].numeroEstudantes;
        }
    }
    return total;
}
// console.log(allLessonsStudentsMath(allLessons));
const createReport=(object,value)=> {
    let total=0;
    let materia=[];
    const array=Object.keys(object);
    for(key in array){
        if(object[array[key]].professor===value){
            total+=object[array[key]].numeroEstudantes;
            materia.push(object[array[key]].materia);
        }
    }
    return Object.assign({},{professor:value,aulas:materia,estudantes:total});//Cria um objeto dentro da propriedade assign atraves de informacoes que sao passadas depois do {}, ou seja ele necessariamente sera um objeto
    //da maneira como foi indicado apos a criacao do objeto, logo sera: {professor:'Maria Clara', aulas:['Matemática', 'Matemática'], estudantes:30}
}
console.log(createReport(allLessons,'Maria Clara'));