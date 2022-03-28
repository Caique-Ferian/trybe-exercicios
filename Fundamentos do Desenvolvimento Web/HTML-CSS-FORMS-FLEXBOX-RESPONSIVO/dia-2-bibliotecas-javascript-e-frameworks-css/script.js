function addOption (){

    const select= document.getElementById('estados-brasil');
    let states = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];

for(let i=0;i<states.length;i+=1){
    const option= document.createElement('option');
    option.innerText=states[i];
    option.value=states[i];
    select.appendChild(option);
}
}
let inputs = {
    nome: {
      maxLength: 40,
      required: true,
    },
    email: {
      maxLength: 50,
      required: true
    },
    cpf: {
      maxLength: 11,
      required: true
    },
    endereco: {
      maxLength: 200,
      required: true
    },
    cidade: {
      maxLength: 28,
      required: true,
    },
    estados: {
      type: 'select',
      required: true,
    },
    tipoImovel: {
      type: 'radio',
      required: true,
    },
    resumo: {
      maxLength: 1000,
      required: true,
    },
    cargo: {
      maxLength: 40,
      required: true,
    },
    cargoDescricao: {
      maxLength: 500,
      required: true,
    },
    dataInicio: {
      type: 'date',
      required: true,
    }
  }
function dateValidation(input,name){
    let dateRegex= /^\d\d\/\d\d\/\d\d\d\d$/;
    if(input.value.length===0){
        return {
            message:'Data invalida'
        };
    }
    if(!dateRegex.test(input.value)){
        return {
            message:'Formato de data invalido'
        };
    }
    let dateSplit= input.value.split('/');
    let day=dateSplit[0];
    let month=dateSplit[1];
    let year=dateSplit[2];
    if(day<0 || day>31){
        return {
            message:'Dia invalido'
            };
    }
    if(month<0 || month>12){
        return {
            message: 'Mes invalido'
        };
    }
    if(year<0){
        return {
            message:'Ano invalido'
        };
    }else {
        return true;
    }

}
function defaultValidation(input,name){
    let textTrim = input.value.trim();
    let typeInput = inputs[name];
    if(typeInput.required && textTrim.length===0){
        return false;
    }else if(typeInput.required && textTrim.length>typeInput.maxLength){
        return false;
    }else{
        return true;
    }
}
function selectValidation(select, name){
    const option= select.options[select.selectedIndex];
    const selectInput = inputs[name];
    if(selectInput.required && (!option || option.disabled)){
        return false;
    }else {
        return true;
    }
}
function radioValidation(input, name){
    const check= document.querySelector(`[name=${name}]:checked`);
    if(check===null){
        return false;
    }else{
        return true;
    }
}
let validations= {
    default: defaultValidation,
    date:   dateValidation,
    select: selectValidation,
    radio: radioValidation,
};
function validateInput (inputName){
    let input= document.querySelector(`[name=${inputName}]`);
    let inputType = inputs[inputName].type;
    if(inputType){
        let validationType= validations[inputType];
        return validationType(input, inputName);
    }else{
        return validations.default(input,inputName);
    }
}
function validateData(){
    let validationList={};
    for(let inputName in inputs){
        let isValid= validateInput(inputName);
        validationList[inputName]=isValid;
    }
    let counter =0;
    let error=[];
    for(let index in validationList){
        if(validationList[index]===false){
            counter+=1;
        }if(validationList[index].message){
            counter+=1;
            error.push(validationList[index].message);
        }
    }
    return {
        counter,
        error,
    }
}
function renderingDefault(input){
    const p= document.createElement('p');
    p.innerText=input.value;
    return p;
}
function renderingSelected(input){
    const p= document.createElement('p');
    const option= input.options[input.selectedIndex];
    p.innerText=option.value;
    return p;
}
function renderingRadio(input){
    const p= document.createElement('p');
    const name= input.getAttribute('name');
    const check= document.querySelector(`[name=${name}]:checked`);
    p.innerText=check.value;
    return p;
}
let renderizations= {
    default: renderingDefault,
    select: renderingSelected,
    radio: renderingRadio,
};
function renderingError(messages){
    const errorDiv= document.createElement('div');
    errorDiv.className='container';
    errorDiv.classList.add('alert');
    errorDiv.classList.add('alert-danger');


    const form = document.querySelector('#cv-form');
    form.prepend(errorDiv);
    for(let message of messages){
        const p= document.createElement('p');
        p.innerText=message;
        errorDiv.appendChild(p);
    }
}
function renderData(){
    const showDiv= document.createElement('div');
    showDiv.className='container';
    showDiv.classList.add('alert');
    showDiv.classList.add('alert-dark');


    showDiv.classList.add('div-curriculum')
    const form = document.querySelector('#cv-form');
    form.prepend(showDiv);
    for(let name in inputs){
        let inputType = inputs[name].type;
        let input= document.querySelector(`[name=${name}]`);
        let content;

        if(renderizations[inputType]){
            content= renderizations[inputType](input);
        }else{
            content=renderizations.default(input);
        }
        showDiv.appendChild(content);
    }

}
function clearAllDivs(){
    const errorDiv= document.querySelectorAll('.alert-danger');
    for(div of errorDiv){
        div.remove();
    }
    const dataDiv = document.querySelector('.alert-dark');
    if(dataDiv){
        dataDiv.remove();
    }
}
function handleSubmit(event){
    event.preventDefault();
    let validation = validateData();
    clearAllDivs();
    if(validation.counter===0){
        renderData();
    }else{
        validation.error.unshift('Dados Invalidos');
        renderingError(validation.error);
    }
}
function clearFields() {
    // let formElements = document.querySelectorAll('input');
    // let textArea = document.querySelector('textarea');
    let div = document.querySelectorAll('.div-curriculum');
    for (let index = 0; /*index < formElements.length &&*/ index < div.length; index += 1) {
    //   let userInput = formElements[index];
    //   userInput.value = '';
    //   textArea.value = '';
      div[index].innerText = '';
      div[index].value = '';
    }
    clearAllDivs();
  }
  
window.onload=function(){
    addOption();    
    const submitButton= document.getElementById('submit-button');
    submitButton.addEventListener('click',handleSubmit);
    const clearButton = document.querySelector('#clear-button');
  clearButton.addEventListener('click', clearFields);
}
