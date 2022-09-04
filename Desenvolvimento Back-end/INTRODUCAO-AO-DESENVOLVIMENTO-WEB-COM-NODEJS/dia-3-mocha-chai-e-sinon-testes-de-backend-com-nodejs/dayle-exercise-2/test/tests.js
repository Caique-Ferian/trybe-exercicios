const {expect} = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const escreveArquivo = require('../escreveArquivo');

describe('escreveArquivo', () => {
    describe('Quando arquivo existe', () => {   
        before(() => {
            sinon.stub(fs,'writeFileSync');
        })
        before(() => {
            fs.writeFileSync.restore();
        })
        describe('a resposta', () => {
            it('é uma string', () => {
                const write = escreveArquivo('arquivo.txt','teste');
                expect(write).to.be.a('string');
            });
            it('retornada é "ok"', () => {
                const write = escreveArquivo('arquivo.txt','teste');
                expect(write).to.be.equals('ok');
            });
        });
    });
});