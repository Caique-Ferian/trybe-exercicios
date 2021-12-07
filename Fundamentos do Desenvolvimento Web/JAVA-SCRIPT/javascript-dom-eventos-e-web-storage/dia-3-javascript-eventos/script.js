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
        }else if(dezDaysList[index]=== 11){
            dayList.innerText= dezDaysList[index];
            dayList.className='friday';    
        }else if(dezDaysList[index]=== 18){
            dayList.innerText= dezDaysList[index];
            dayList.className='friday';    
        }else if(dezDaysList[index]=== 24){
            dayList.innerText= dezDaysList[index];
            dayList.className='holiday';    
        }else if(dezDaysList[index]=== 25){
            dayList.innerText= dezDaysList[index];
            dayList.className='holiday'; 
            dayList.classList.add('friday');    
        }else if(dezDaysList[index]=== 31){
            dayList.innerText= dezDaysList[index];
            dayList.className='holiday';
               
        }else{
            dayList.innerText= dezDaysList[index];
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
        // for(let fill=0;fill<fridays.length;fill+=1){
        //     oldText.push(fridays[fill].innerText);
        // }
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