window.onload=function(){
    const button=document.getElementById('btn-click');
    const p=document.getElementById('counter');
    let clickCount=0;
    button.addEventListener('click',function(){
        clickCount+=1;
        p.innerText=`Voce Clicou:${clickCount} vezes`
    });
};