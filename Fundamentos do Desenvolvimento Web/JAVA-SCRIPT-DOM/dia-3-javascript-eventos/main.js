const firstLi = document.getElementById('first-li');
const secondLi = document.getElementById('second-li');
const thirdLi = document.getElementById('third-li');
const input = document.getElementById('input');
const myWebpage = document.getElementById('my-spotrybefy');


// 1. Copie esse arquivo e edite apenas ele;
// 1.1. Antes de começar os exercícios, use o LiveServer para dar uma olhada em como está a página no navegador.
// 1.2. Note que uma das caixas está um pouco acima das outras. Por que isso ocorre?
//Por que a classe tech da caixa e esta empurrando o elemento para cima.

// 2. Crie uma função que adicione a classe 'tech' ao elemento `li` quando for clicado.
secondLi.addEventListener("click",addTech);
thirdLi.addEventListener("click",addTech);
function addTech(event){
    let eventTarget= event.target;
    eventTarget.className= 'tech';
}
// 2.1. Deve existir apenas um elemento com a classe 'tech'. Como você faz isso?
secondLi.addEventListener("dblclick",removeTech);
thirdLi.addEventListener("dblclick",removeTech);
function removeTech(event){
    let eventTarget= event.target;
    eventTarget.classList.remove('tech');
}

// 3. Crie uma função que, ao digitar na caixa de texto, altere o texto do elemento
// com a classe 'tech';
function editTextList(){
    let condicion= document.getElementsByClassName('tech');
    for(let index=0;index<condicion.length;index+=1){
        condicion[index].innerText=input.value;
    }
}
input.addEventListener('keyup',editTextList);

// 4. Crie uma função que, ao clicar duas vezes em 'Meu top 3 do Spotrybefy', ele
// redirecione para alguma página;
// 4.1. Que tal redirecionar para seu portifólio?
function linkPortfolio(){
    window.location.assign('https://caique-ferian.github.io/');
}
myWebpage.addEventListener('dblclick',linkPortfolio);
// 5. Crie uma função que, ao passar o mouse sobre 'Meu top 3 do Spotrybefy', altere
// a cor do mesmo;
function changeColor(event){
    let eventType= event.type;
    if(eventType==='mouseover'){
      myWebpage.style.color='#2fc18c';
    }else{
        myWebpage.style.color='white';
        
    }
}
myWebpage.addEventListener('mouseover',changeColor);
myWebpage.addEventListener('mouseout',changeColor);
// Segue abaixo um exemplo do uso de event.target:


function resetText(event) {
  // O Event é passado como um parâmetro para a função.
  event.target.innerText = 'Opção reiniciada';
  // O event possui várias propriedades, porém a mais usada é o event.target,
  // que retorna o objeto que disparou o evento.
}

firstLi.addEventListener('dblclick', resetText);

// Não precisa passar o parâmetro dentro da callback resetText. O próprio
// navegador fará esse trabalho por você, não é legal? Desse jeito, o
// event.target na nossa função retornará o objeto 'firstLi'.