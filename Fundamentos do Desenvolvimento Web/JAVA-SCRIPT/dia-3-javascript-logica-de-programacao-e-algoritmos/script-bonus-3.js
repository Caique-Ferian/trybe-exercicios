let n=5;
let ast = '*';
let desenho='';
let inputSpace=n;

for(let triangulo=0; triangulo<n;triangulo+=1){
    
    for(let preencher=0; preencher<=n;preencher+=1){
        if(preencher<inputSpace){
            desenho=desenho+' ';
        }
        else{
            desenho=desenho+ast;
        }
        
    }
    console.log(desenho);
    desenho='';
    inputSpace-=1;
}
