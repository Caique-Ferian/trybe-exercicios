const myRemove= require('./my-remove');

describe('Verifica funcionamento funcao My Remove',()=>{

    test('Verifica se ao informar myRemove([1, 2, 3, 4], 3) remove o item 3', () =>{
        expect(myRemove([1, 2, 3, 4], 3)).toEqual([1,2,4]);
    });
    test('Verifica se ao informar myRemove([1, 2, 3, 4], 3) retorna o array sem o 3', () =>{
        expect(myRemove([1, 2, 3, 4], 3)).not.toEqual([1,2,3,4]);
    });
    test('Verifica se ao informar myRemove([1, 2, 3, 4], 3) remove o item 5 se existir', () =>{
        expect(myRemove([1, 2, 3, 4], 5)).toEqual([1,2,3,4]);
    });
});