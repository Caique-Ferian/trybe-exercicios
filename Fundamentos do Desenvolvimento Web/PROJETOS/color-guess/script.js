const game= document.getElementById('guess-color');
const section= document.getElementById('game-container');
const p=document.getElementById('rgb-color');
const button= document.createElement('button');
button.setAttribute('id','reset-game');
button.innerText='Resetar o jogo';
const message= document.createElement('h2');
message.setAttribute('id','answer');
message.innerText='Escolha uma cor';
const score= document.getElementById('score');
function generateColors(){
    return '('+Math.round((Math.random()*255)+1)+', '+Math.round((Math.random()*255)+1)+', '+Math.round((Math.random()*255)+1)+')'; 
}
function generateOptions(){
    let colors=[];
    for(let index= 0; index <= 5; index += 1){
        const div= document.createElement('div');
        colors[index]=generateColors();
        let option="rgb"+colors[index];
        div.className='ball';
        div.style.backgroundColor=option;
        game.appendChild(div);
        p.innerText=colors[Math.round(Math.random()*index)];
    }  
}
generateOptions();

function deleteDivs(){
    const divs= document.querySelectorAll('.ball');
    for(let i = 0; i <= 5; i += 1){
        game.removeChild(divs[i]);
    }
}
window.onload=function(){
    let acerto=0;
    game.addEventListener('click',function(event){
        if(event.target.style.backgroundColor==="rgb"+p.innerText){
            acerto=acerto+3;
            message.innerText='Acertou!'
            score.innerText='Placar:'+acerto;

        }else{
            message.innerText='Errou! Tente novamente!';
            
        }
    });
    section.appendChild(message);
    section.appendChild(button);
    button.addEventListener('click',function(){
        deleteDivs();
        generateOptions();
        message.innerText='Escolha uma cor';
    });
}