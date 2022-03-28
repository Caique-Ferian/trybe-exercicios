let myModal = new bootstrap.Modal(document.getElementById('myModal'));

let button = document.querySelector("#nao-clicar");

button.addEventListener("click", function(){
    myModal.show()
});