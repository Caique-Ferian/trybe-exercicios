function createDaysOfTheWeek() {
    const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const weekDaysList = document.querySelector('.week-days');
  
    for (let index = 0; index < weekDays.length; index += 1) {
      const days = weekDays[index];
      const dayListItem = document.createElement('li');
      dayListItem.innerHTML = days;
  
      weekDaysList.appendChild(dayListItem);
    };
  };
  
  createDaysOfTheWeek();
  
// Escreva seu código abaixo.
//Exercicio 1
function placeDaysOfTheMonth() {
    const dezDaysList = [29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    const daysOfTheMonth= document.getElementById('days');
    for(let index=0;index<dezDaysList.length;index+=1){
        const dayList= document.createElement('li');
        if(dezDaysList[index]=== 4){
            dayList.innerText= dezDaysList[index];
            dayList.className='friday';
            dayList.classList.add('days-list');     
        }else if(dezDaysList[index]=== 11){
            dayList.innerText= dezDaysList[index];
            dayList.className='friday';
            dayList.classList.add('days-list');    
        }else if(dezDaysList[index]=== 18){
            dayList.innerText= dezDaysList[index];
            dayList.className='friday';
            dayList.classList.add('days-list');    
        }else if(dezDaysList[index]=== 24){
            dayList.innerText= dezDaysList[index];
            dayList.className='holiday';
            dayList.classList.add('days-list');    
        }else if(dezDaysList[index]=== 25){
            dayList.innerText= dezDaysList[index];
            dayList.className='holiday'; 
            dayList.classList.add('friday');
            dayList.classList.add('days-list');    
        }else if(dezDaysList[index]=== 31){
            dayList.innerText= dezDaysList[index];
            dayList.className='holiday';
            dayList.classList.add('days-list');
               
        }else{
            dayList.innerText= dezDaysList[index];
            dayList.classList.add('days-list');
        }
        daysOfTheMonth.appendChild(dayList);
    }
}
placeDaysOfTheMonth();
//Exercicio 2
function createButton(string){
    const div= document.querySelector('.buttons-container');
    const create= document.createElement('button');
    create.setAttribute('id','btn-holiday');
    create.innerText= string;
    div.appendChild(create);
}
createButton('Feriados');
//Exercicio 3 
function holidaysChangeColor (){
    const button= document.getElementById('btn-holiday');
    let count=0;
    button.addEventListener('click', function(event){
        const holidays =document.getElementsByClassName('holiday');
        if(event.type==='click'){
            count+=1;
            for(let index=0;index<holidays.length;index+=1){
                holidays[index].style.backgroundColor='red';
                if(count%2===0){
                    holidays[index].style.backgroundColor='rgb(238,238,238)';
                }
            }
        }
    });
}
holidaysChangeColor();
//Exercicio 4
function createButtonFriday(string){
    const div =document.querySelector('.buttons-container');
    const button = document.createElement('button');
    button.setAttribute('id','btn-friday');
    button.innerText= string;
    div.appendChild(button);
}
createButtonFriday('Sexta-feira');
//Exercicio 5
function fridaysChangeText(){
    const button = document.getElementById('btn-friday');
    let counting =0;
    button.addEventListener('click',function(event){
        const fridays= document.getElementsByClassName('friday');
        let oldText=['4','11','18','25'];
        if(event.type==='click'){
            counting+=1;
            for(let index=0;index<fridays.length;index+=1){
                
                fridays[index].innerText='SEXTOU!!';
                if(counting%2===0){ 
                    fridays[index].innerText= oldText[index];
                }
            }        
        }

    });
}
fridaysChangeText();
//Exercicio 6
function zoom (){
    const list= document.getElementById('days');
    list.addEventListener('mouseover', function (event){
       event.target.style.fontSize='30px';
    });
    list.addEventListener('mouseout', function (event){
        event.target.style.fontSize='20px';
    });
}
zoom();
//Exercicio 7
function tasks (string){
    const myTasks= document.querySelector('.my-tasks');
    const createTask= document.createElement('span');
    createTask.innerText=string;
    myTasks.appendChild(createTask);
}
tasks('Estudar');
//Exercicio 8
function subtitle (color){
    const myTasks= document.querySelector('.my-tasks');
    const createSubtitle= document.createElement('div');
    createSubtitle.className='task';
    createSubtitle.style.backgroundColor=color;
    myTasks.appendChild(createSubtitle);
}
subtitle('green');
//Exercicio 9
function selectSubtitle(){
    const subtitle= document.querySelector('.task');
    let count=0;
    subtitle.addEventListener('click', function(event){
        if(event.type==='click'){
            count+=1;
            subtitle.classList.add('task-selected');
            if(count%2===0){
                subtitle.classList.remove('task-selected');
            }
        }
    });
}
selectSubtitle();
//Exercicio 10
function attributeTask(){
    const taskSelected= document.querySelector('.task');
    let count=0;
    taskSelected.addEventListener('click', function(){    
        const list= document.getElementById('days');
        list.addEventListener('click', function (event){
            if(event.type==='click'){
                event.target.style.color='green';
                count+=1;
            }
            if(count%2===0){
                event.target.style.color='rgb(119,119,119)';
            }
        });
});
}
attributeTask();