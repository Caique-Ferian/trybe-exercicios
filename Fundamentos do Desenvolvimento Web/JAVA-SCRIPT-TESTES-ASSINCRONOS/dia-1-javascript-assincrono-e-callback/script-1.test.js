const { expect } = require("@jest/globals");

const uppercase = (str, callback) => {
    setTimeout(() => {
      callback(str.toUpperCase());
    }, 500);
  };

  test('Verifica a callback da funcao uppercase', (done) => {
    uppercase('verifica a callback!',(action) =>{
        try {
            expect(action).toBe('VERIFICA A CALLBACK!');
            done();
        } catch(error) {
            done(error);
        }
    });
  });