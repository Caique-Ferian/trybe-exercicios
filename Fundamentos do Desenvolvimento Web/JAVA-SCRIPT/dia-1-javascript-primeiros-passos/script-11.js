let sal = 6000;
let aliquota1;
let inss;
let salBase;
let aliquota2;
let ir;
let salLiq;

if(sal<=1556.94){
    aliquota1=0.08;
    inss=sal*aliquota1;
    salBase=Math.round(sal-inss);
    console.log(salBase,'reais de salario liquido aproximadamente.');

}else if(sal>=1556.95 && sal<=1903.98){
    aliquota1=0.09;
    console.log(salBase,'reais de salario liquido aproximadamente.');

}else if(sal>=1903.99 && sal<=2594.92){
    aliquota1=0.09;
    aliquota2=0.075;
    inss=sal*aliquota1;
    salBase=sal-inss;
    console.log(Math.round(salBase),'reais de salario base aproximadamente.');
    ir= (salBase*aliquota2)-142.80;
    salLiq=Math.round(salBase-Math.abs(ir));
    console.log(salLiq,'reais de salario liquido aproximadamente');
}else if(sal>=2594.93 && sal<=2826.65){
    aliquota1=0.11;
    aliquota2=0.075;
    inss=sal*aliquota1;
    salBase=sal-inss;
    console.log(Math.round(salBase),'reais de salario base aproximadamente.');
    ir= (salBase*aliquota2)-142.80;
    salLiq=Math.round(salBase-Math.abs(ir));
    console.log(salLiq,'reais de salario liquido aproximadamente');
}else if(sal>=2826.66 && sal<=3751.05){
    aliquota1=0.11;
    aliquota2=0.15;
    inss=sal*aliquota1;
    salBase=sal-inss;
    console.log(Math.round(salBase),'reais de salario base aproximadamente.');
    ir= (salBase*aliquota2)-354.80;
    salLiq=Math.round(salBase-Math.abs(ir));
    console.log(salLiq,'reais de salario liquido aproximadamente');
}else if(sal>=3751.06 && sal<=4664.68){
    aliquota1=0.11;
    aliquota2=0.225;
    inss=sal*aliquota1;
    salBase=sal-inss;
    console.log(Math.round(salBase),'reais de salario base aproximadamente.');
    ir= (salBase*aliquota2)-636.13;
    salLiq=Math.round(salBase-Math.abs(ir));
    console.log(salLiq,'reais de salario liquido aproximadamente');
}else if(sal>=4664.69 && sal<=5189.82){
    aliquota1=0.11;
    aliquota2=0.275;
    inss=sal*aliquota1;
    salBase=sal-inss;
    console.log(Math.round(salBase),'reais de salario base aproximadamente.');
    ir= (salBase*aliquota2)-869.36;
    salLiq=Math.round(salBase-Math.abs(ir));
    console.log(salLiq,'reais de salario liquido aproximadamente');
}else {
    inss=570.88;
    aliquota2=0.275;
    salBase=sal-inss;
    console.log(Math.round(salBase),'reais de salario base aproximadamente.');
    ir= (salBase*aliquota2)-869.36;
    salLiq=Math.round(salBase-Math.abs(ir));
    console.log(salLiq,'reais de salario liquido aproximadamente');
}