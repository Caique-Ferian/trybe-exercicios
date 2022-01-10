//Exercicios 1 e 2
document.getElementById('elementoOndeVoceEsta').parentNode.style.color='red';

//Exercicio 3
// document.getElementById('primeiroFilhoDoFilho').innerText='Ola Mundo!!!'; OU
document.getElementById('elementoOndeVoceEsta').firstElementChild.innerText='Ola Mundo!!!';

// Exercicio 4
//console.log(document.getElementById('pai').firstChild.nextSibling);

//Exercicio 5
//console.log(document.getElementById('elementoOndeVoceEsta').previousElementSibling);

//Exercicio 6
//console.log(document.getElementById('elementoOndeVoceEsta').nextSibling);

//Exercicio 7
// console.log(document.getElementById('elementoOndeVoceEsta').nextElementSibling);

//Exercicio 8
// console.log(document.getElementById('pai').lastElementChild.previousElementSibling);

let newElement= document.createElement('section');
let newElement2= document.createElement('section');
let newElement3=document.createElement('section');
document.getElementById('pai').appendChild(newElement);
document.getElementById('elementoOndeVoceEsta').appendChild(newElement2);
document.getElementById('elementoOndeVoceEsta').firstElementChild.appendChild(newElement3);
newElement.setAttribute('id','sectionOne');
newElement2.setAttribute('id','sectionTwo');
newElement3.setAttribute('id','sectionThree');
console.log(document.querySelector('#sectionThree').parentNode.parentNode.nextElementSibling);//OU
// document.getElementsByTagName('section')[4].parentNode.parentNode.nextElementSibling;
let father=document.querySelector('#pai');
let whereAmI=document.querySelector('#elementoOndeVoceEsta');
father.removeChild(primeiroFilho);
father.removeChild(terceiroFilho);
father.removeChild(quartoEUltimoFilho);
father.removeChild(sectionOne);
whereAmI.removeChild(segundoEUltimoFilhoDoFilho);
whereAmI.removeChild(sectionTwo);
