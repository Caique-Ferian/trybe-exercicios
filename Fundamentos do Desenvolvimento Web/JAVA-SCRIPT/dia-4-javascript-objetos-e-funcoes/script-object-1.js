let info = {
    personagem: 'Margarida',
    origem: 'Pato Donald',
    nota: 'Namorada do personagem principal nos quadrinhos do Pato Donald',
  };
let infoPatinhas = {
    personagem: 'Tio Patinhas',
    origem: "Christmas on Bear Mountain, Dell's Four Color Comics #178",
    nota: 'O último MacPatinhas',
};
console.log('Bem-vinda,',info.personagem);
info.recorrente='Sim';
infoPatinhas.recorrente='Sim';
console.log(info);
for(let key in info,infoPatinhas){
    if(key!== 'recorrente'){
        console.log(info[key],'e',infoPatinhas[key]);
    }else {
        console.log('Ambos recorrentes');
    }
    
}
