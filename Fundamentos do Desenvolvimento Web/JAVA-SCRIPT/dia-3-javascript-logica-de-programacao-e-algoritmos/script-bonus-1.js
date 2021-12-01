let n=5;
let ast = '*';
let desenho='';

for(let coluna=0; coluna<n;coluna+=1){
    for(let linha =0;linha<n;linha+=1){
        desenho=desenho+ast;
    }
    console.log(desenho);
    desenho='';
}