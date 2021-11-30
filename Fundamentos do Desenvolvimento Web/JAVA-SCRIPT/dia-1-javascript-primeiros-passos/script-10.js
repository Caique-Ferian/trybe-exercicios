const valorCusto=1000;
const valorVenda=2000;
let valorCustoTotal = valorCusto + (0.2 * valorCusto );
let lucro = valorVenda - valorCustoTotal;

    if(valorCusto<0 || valorVenda<0){
        console.log('Erro! Valor fornecido invalido.');
    }else{
        console.log('O Lucro da empresa com a venda de mil produtos e de: ',(lucro*1000),'reais');
    }
