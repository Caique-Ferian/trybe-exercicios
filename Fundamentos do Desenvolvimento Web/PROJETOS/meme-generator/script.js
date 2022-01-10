const div= document.getElementById('meme-image-container');
const divText= document.getElementById('text-container');
const input= document.querySelector('#text-input');
const memeText=document.createElement('label');
const memeFile=document.querySelector('#meme-insert');
const memeButton=document.querySelector('#button-id');
const fireButton =document.querySelector('#fire');
const waterButton =document.querySelector('#water');
const earthButton =document.querySelector('#earth');
const defaultButton =document.querySelector('#default');
memeText.setAttribute('id','meme-text');
input.addEventListener('keyup',function(){    
    memeText.innerText=input.value;
});
divText.appendChild(memeText);
memeButton.addEventListener('click',function(){
    memeFile.click();
});
//Feito com ajuda do site: https://www.webtrickshome.com/forum/how-to-display-uploaded-image-in-html-using-javascript
// https://developer.mozilla.org/pt-BR/docs/Web/API/URL/createObjectURl
// https://developer.mozilla.org/pt-BR/docs/Web/API/File/Using_files_from_web_applications
let loadFile= function(event){
    const memeImage=document.getElementById('meme-image');
    memeImage.src=URL.createObjectURL(event.target.files[0]);
};
fireButton.addEventListener('click',function(){
    div.style.border='3px dashed red'
});
waterButton.addEventListener('click',function(){
    div.style.border='5px double blue'
});
earthButton.addEventListener('click',function(){
    div.style.border='6px groove green'
});
defaultButton.addEventListener('click',function(){
    div.style.border='1px solid black'
});
function meme1 (){
    const memeImage=document.getElementById('meme-image');
    memeImage.src='imgs/meme1.png';
}
function meme2 (){
    const memeImage=document.getElementById('meme-image');
    memeImage.src='imgs/meme2.png';
}
function meme3 (){
    const memeImage=document.getElementById('meme-image');
    memeImage.src='imgs/meme3.png';
}
function meme4 (){
    const memeImage=document.getElementById('meme-image');
    memeImage.src='imgs/meme4.png';
}