function myFizzBuzz(num) {
    if (typeof num !== 'number') return false;
    if (num % 3 === 0 && num % 5 === 0) return 'fizzbuzz';
    if (num % 3 === 0) return 'fizz';
    if (num % 5 === 0) return 'buzz';
    return num;
  }
  
  // implemente seus testes aqui
  describe('Testando funcao myFizzBuzz', () =>{

    test('Verifica se ao informar 15 retorna "fizzbuzz"', ()=>{
      
      expect(myFizzBuzz(15)).toBe('fizzbuzz');
    });
    test('Verifica se ao informar 9 retorna "fizz"', ()=>{
      
      expect(myFizzBuzz(9)).toBe('fizz');
    });
    test('Verifica se ao informar 10 retorna "buzz"', ()=>{
      
      expect(myFizzBuzz(10)).toBe('buzz');
    });
    test('Verifica se ao informar 11 retorna o proprio numero', ()=>{
      
      expect(myFizzBuzz(11)).toBe(11);
    });
    test('Verifica se ao informar "fizz" retorna false', ()=>{
      
      expect(myFizzBuzz('fizz')).toBe(false);
    });
  });