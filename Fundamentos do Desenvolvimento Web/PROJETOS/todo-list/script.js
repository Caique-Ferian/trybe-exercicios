window.onload=function(){
    const main= document.getElementById('main-content');
    const input= document.createElement('input');
    const list= document.createElement('ol');
    input.setAttribute('id','texto-tarefa');
    list.setAttribute('id','lista-tarefas');
    input.placeholder='Adicione aqui suas tarefas!';
    main.appendChild(input);
    main.appendChild(list);
    function buttonAdd(){
        const button= document.createElement('button');
        button.setAttribute('id','criar-tarefa');
        button.innerText='Adicionar'
        let itens=[];
        button.addEventListener('click',function(){
            const listItens=document.createElement('li');
            listItens.innerText=input.value;
            list.appendChild(listItens);
            itens.push(listItens);
            input.value='';
        });
        main.appendChild(button);

    }
    buttonAdd();
    function selectingItens(){
        const listItens= list.childNodes;
        list.addEventListener('click',function(event){
            for(let index=0;index<listItens.length;index+=1){
                listItens[index].classList.remove('selected');
            }
            event.target.classList.add('selected');
        })
    }
    selectingItens();
    function crossingOfTask(){
        list.addEventListener('dblclick',function(event){
            if(event.target.classList.contains('completed')===true){
                event.target.classList.remove('completed');
            }else{
                event.target.classList.add('completed');
            }
        });
    }
    crossingOfTask();
    function clearButton(){
        const button= document.createElement('button');
        button.setAttribute('id','apaga-tudo');
        button.innerText='Limpar Lista'
        button.addEventListener('click',function(){;
            const length=(list.childNodes.length-1);
            for(let i=length;i>=0;i-=1){
                list.removeChild(list.childNodes[i]); 
            }
        });
        main.appendChild(button);
    }
    clearButton();
    function removeCompleted(){
        const button= document.createElement('button');
        button.setAttribute('id','remover-finalizados');
        button.innerText='Remover Finalizados'
        button.addEventListener('click',function(){
            const length=(list.childNodes.length-1);
            for(let i=length;i>=0;i-=1){
                if(list.childNodes[i].classList.contains('completed')){

                    list.removeChild(list.childNodes[i]); 
                }
            }
        });
        main.appendChild(button);

    }
    removeCompleted();
    function saveTasks(){
        const button= document.createElement('button');
        button.setAttribute('id','salvar-tarefas');
        button.innerText='Salvar Tarefas'
        button.addEventListener('click',function(){
            const oldList= JSON.parse(localStorage.getItem('task'));
            oldList.push(list.innerHTML);
            localStorage.setItem('task', JSON.stringify(oldList));
        });
        main.appendChild(button);
        
        
    }
    saveTasks();
    function getSavedTasks (){
        if(localStorage.getItem('task')=== null){
            localStorage.setItem('task', JSON.stringify([]));
        }else{
            const savedTasks= JSON.parse(localStorage.getItem('task'));
            list.innerHTML=savedTasks;
        }
    }
    getSavedTasks();
    // localStorage.clear();
    function movingItens(){
        const buttonUp= document.createElement('button');
        buttonUp.setAttribute('id','mover-cima');
        buttonUp.innerText='↑';
        const buttonDown= document.createElement('button');
        buttonDown.setAttribute('id','mover-baixo');
        buttonDown.innerText='↓';
        buttonUp.addEventListener('click',function(){
            const chosenTask= document.querySelector('.selected');
            let savedTask='';
            if(chosenTask!==null && chosenTask.previousElementSibling!==null){
                savedTask=chosenTask.innerHTML;
                chosenTask.innerHTML=chosenTask.previousElementSibling.innerHTML;
                chosenTask.previousElementSibling.innerHTML=savedTask;
                chosenTask.classList.remove('selected');
                chosenTask.previousElementSibling.classList.add('selected');
            }
            if(chosenTask!==null && chosenTask.previousElementSibling!==null && chosenTask.classList.contains('completed')){
                chosenTask.classList.remove('completed');
                chosenTask.previousElementSibling.classList.add('completed');
            }
        
        
        });
        buttonDown.addEventListener('click',function(){
            const chosenTask= document.querySelector('.selected');
            let savedTask='';
            if(chosenTask!==null && chosenTask.nextElementSibling!==null){
                savedTask=chosenTask.innerHTML;
                chosenTask.innerHTML=chosenTask.nextElementSibling.innerHTML;
                chosenTask.nextElementSibling.innerHTML=savedTask;
                chosenTask.classList.remove('selected');
                chosenTask.nextElementSibling.classList.add('selected');
             }
            if(chosenTask!==null && chosenTask.nextElementSibling!==null && chosenTask.classList.contains('completed')){
                chosenTask.classList.remove('completed');
                chosenTask.nextElementSibling.classList.add('completed');
            }
        });
       
        main.appendChild(buttonUp);
        main.appendChild(buttonDown);

    }
    movingItens();
    function deletingTask () {
        const listItem= list.childNodes;
        const deletingButton= document.createElement('button');
        const length=(list.childNodes.length);
        deletingButton.setAttribute('id','remover-selecionado');
        deletingButton.innerText='X';
        deletingButton.addEventListener('click',function(){
            for(let deleting of listItem){
                if(deleting.classList.contains('selected')){
                    list.removeChild(deleting);
                }
            }
        });
        main.appendChild(deletingButton);
    }
    deletingTask();

}
