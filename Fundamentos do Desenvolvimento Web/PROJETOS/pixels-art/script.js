window.onload=function (){
    function fillBoard(){
        const board= document.getElementById('pixel-board');
        for(let index=0;index<25;index+=1){
            const div= document.createElement('div');
            div.className='pixel';
            board.appendChild(div);
        }
    }
    fillBoard();
    function fillColorPallete(){
        const colorPallete= document.getElementById('color-palette');
        for(let index=0;index<4;index+=1){
            const div= document.createElement('div');
            div.className='color';
            if(index===0){
                div.classList.add('first-color','selected');
            }else if(index===1){
                div.classList.add('second-color')
            }else if(index===2){
                div.classList.add('third-color')
            }else if(index===3){
                div.classList.add('fourth-color')
            }
            colorPallete.appendChild(div);
        }
    }
    fillColorPallete();

    function initialColor(){
        const colorOne= document.querySelector('.selected');
        const board=document.getElementById('pixel-board');
        let firstColor=generateColors();
        
        colorOne.style.backgroundColor=firstColor[0];
        board.addEventListener('click',function(event){
            const color= colorOne.style.backgroundColor;
            event.target.style.backgroundColor=color;
        });
    }
    initialColor();
    function generateColors(){
        let randomColors=['rgb(0,0,0)'];
        for(let randomize=1;randomize<4; randomize += 1){
            randomColors.push('rgb'+'('+Math.round(Math.random()*256)+','+Math.round(Math.random()*256)+','+Math.round(Math.random()*256)+')');
        }
        return randomColors;
    }
    function switchColor(){
        const board=document.getElementById('pixel-board');
        let colors=generateColors();
        const colorOne = document.querySelector('.first-color');
        const colorTwo = document.querySelector('.second-color');
        colorTwo.style.backgroundColor=colors[1];
        const colorThree = document.querySelector('.third-color');
        colorThree.style.backgroundColor=colors[2];
        const colorFour= document.querySelector('.fourth-color');
        colorFour.style.backgroundColor=colors[3];
        const header = document.querySelector('#title');
        const footer = document.querySelector('#copyright');
        const aside= document.getElementById('aside');
        document.addEventListener('click',function(event){
            if(event.target.classList.contains('second-color')){
                event.target.classList.add('selected');
                colorFour.classList.remove('selected');
                colorOne.classList.remove('selected');
                colorThree.classList.remove('selected');
                board.addEventListener('click',function(event){
                        
                    event.target.style.backgroundColor=colors[1];
                });
                header.addEventListener('click',function(){
                        
                    header.style.color=colors[1];
                });
                footer.addEventListener('click',function(){
                        
                    footer.style.color=colors[1];
                });
                aside.addEventListener('click',function(){
                        
                    aside.style.backgroundColor=colors[1];
                });
            }else if(event.target.classList.contains('third-color')){
                event.target.classList.add('selected');
                colorTwo.classList.remove('selected');
                colorOne.classList.remove('selected');
                colorFour.classList.remove('selected');
                board.addEventListener('click',function(event){
                        
                    event.target.style.backgroundColor=colors[2];
                });
                header.addEventListener('click',function(){
                        
                    header.style.color=colors[2];
                });
                footer.addEventListener('click',function(){
                        
                    footer.style.color=colors[2];
                });
                aside.addEventListener('click',function(){
                        
                    aside.style.backgroundColor=colors[2];
                });
            }else if(event.target.classList.contains('fourth-color')){
                event.target.classList.add('selected');
                colorTwo.classList.remove('selected');
                colorOne.classList.remove('selected');
                colorThree.classList.remove('selected');
                board.addEventListener('click',function(event){
                        
                    event.target.style.backgroundColor=colors[3];
                });
                header.addEventListener('click',function(){
        
                    header.style.color=colors[3];
                });
                footer.addEventListener('click',function(){
                        
                    footer.style.color=colors[3];
                });
                aside.addEventListener('click',function(){
                        
                    aside.style.backgroundColor=colors[3];
                });
            }else if(event.target.classList.contains('first-color')){
                event.target.classList.add('selected');
                colorTwo.classList.remove('selected');
                colorFour.classList.remove('selected');
                colorThree.classList.remove('selected');
                board.addEventListener('click',function(event){
                        
                    event.target.style.backgroundColor=colors[0];
                });
                header.addEventListener('click',function(){
                        
                    header.style.color=colors[0];
                });
                footer.addEventListener('click',function(){
                        
                    footer.style.color=colors[0];
                });
                aside.addEventListener('click',function(){
                        
                    aside.style.backgroundColor=colors[0];
                });
            } 
                
        });
    }
    switchColor();
    function clearBtn(){}{
        const button =document.getElementById('clear-board');
        button.addEventListener('click',function(){
            const pixels= document.querySelectorAll('.pixel');
            const header = document.getElementById('title');
            const footer = document.getElementById('copyright');
            const board=document.getElementById('pixel-board');
            header.style.color='white';
            footer.style.color='white';
            aside.style.backgroundColor='white';
            board.style.backgroundColor='rgb(255,255,255)';
            for(let index=0;index<pixels.length;index+=1){
                pixels[index].style.backgroundColor='rgb(255,255,255)';
            }
        })
    }
    clearBtn();
    
    function createBoard(){
        const input= document.getElementById('board-size');
        const button= document.querySelector('#generate-board');
        button.addEventListener('click',function(){
            const board= document.getElementById('pixel-board');
            let size= (input.value)*(input.value);
            if(input.value=== ''){
                alert('Board inválido!');
            }else if(input.value<5){
                size=5*5;
            }
            else if(input.value>50){
                size=50*50;
            }
            for(let index=0;index<(size-25);index+=1){
                const div= document.createElement('div');
                div.className='pixel';
                board.appendChild(div);
            }
            board.style.width='650px';
        });
    }
    createBoard();
}