window.onload= function () {

    function changeBackgroundColor (){
        const backgroundColor= document.querySelectorAll('.color');
        const paragraph=document.getElementsByClassName('paragraph');
        for(let index=0;index<backgroundColor.length;index+=1){
            
            backgroundColor[index].addEventListener('click', function(event){
               for(let setParagraph=0;setParagraph<paragraph.length;setParagraph+=1){

                   if(event.target.innerText==='Black'){
                       paragraph[setParagraph].style.backgroundColor='black';
                    }else if(event.target.innerText==='Purple'){
                        paragraph[setParagraph].style.backgroundColor='purple';
                    }else if(event.target.innerText==='Red'){
                        paragraph[setParagraph].style.backgroundColor='red';
                    }else if(event.target.innerText==='Default'){
                        paragraph[setParagraph].style.backgroundColor='white';
                    }
                }
            });

        }
    }
    changeBackgroundColor();
    function changeTextColor (){
        const textColor= document.querySelectorAll('.text-color');
        const paragraph=document.getElementsByClassName('paragraph');
        for(let index=0;index<textColor.length;index+=1){
            
            textColor[index].addEventListener('click', function(event){
               for(let setParagraph=0;setParagraph<paragraph.length;setParagraph+=1){

                   if(event.target.innerText==='Blue'){
                       paragraph[setParagraph].style.color='blue';
                    }else if(event.target.innerText==='White'){
                        paragraph[setParagraph].style.color='white';
                    }else if(event.target.innerText==='Green'){
                        paragraph[setParagraph].style.color='green';
                    }else if(event.target.innerText==='Default'){
                        paragraph[setParagraph].style.color='black';
                    }
                }
            });

        }
    }
    changeTextColor();
    function changeFontSize (){
        const size= document.querySelectorAll('.text-size');
        const paragraph=document.getElementsByClassName('paragraph');
        for(let index=0;index<size.length;index+=1){
            
            size[index].addEventListener('click', function(event){
               for(let setParagraph=0;setParagraph<paragraph.length;setParagraph+=1){

                   if(event.target.innerText==='30px'){
                       paragraph[setParagraph].style.fontSize='30px';
                    }else if(event.target.innerText==='40px'){
                        paragraph[setParagraph].style.fontSize='40px';
                    }else if(event.target.innerText==='60px'){
                        paragraph[setParagraph].style.fontSize='60px';
                    }else if(event.target.innerText==='Default'){
                        paragraph[setParagraph].style.fontSize='20px';
                    }
                }
            });

        }
    }
    changeFontSize();
    function changeLineHeight (){
        const lineHeight= document.querySelectorAll('.text-height');
        const paragraph=document.getElementsByClassName('paragraph');
        for(let index=0;index<lineHeight.length;index+=1){
            
            lineHeight[index].addEventListener('click', function(event){
               for(let setParagraph=0;setParagraph<paragraph.length;setParagraph+=1){

                   if(event.target.innerText==='40px'){
                       paragraph[setParagraph].style.lineHeight='40px';
                    }else if(event.target.innerText==='60px'){
                        paragraph[setParagraph].style.lineHeight='60px';
                    }else if(event.target.innerText==='80px'){
                        paragraph[setParagraph].style.lineHeight='80px';
                    }else if(event.target.innerText==='Default'){
                        paragraph[setParagraph].style.lineHeight='35px';
                    }
                }
            });

        }
    }
    changeLineHeight();
    function changeFontFamily (){
        const fontFamily= document.querySelectorAll('.text-font');
        const paragraph=document.getElementsByClassName('paragraph');
        for(let index=0;index<fontFamily.length;index+=1){
            
            fontFamily[index].addEventListener('click', function(event){
               for(let setParagraph=0;setParagraph<paragraph.length;setParagraph+=1){

                   if(event.target.innerText==='Monospace'){
                       paragraph[setParagraph].style.fontFamily='monospace';
                    }else if(event.target.innerText==='Montserrat'){
                        paragraph[setParagraph].style.fontFamily='Montserrat';
                    }else if(event.target.innerText==='Arial'){
                        paragraph[setParagraph].style.fontFamily='Arial';
                    }else if(event.target.innerText==='Default'){
                        paragraph[setParagraph].style.fontFamily='serif';
                    }
                }
            });

        }
    }
    changeFontFamily();
}



