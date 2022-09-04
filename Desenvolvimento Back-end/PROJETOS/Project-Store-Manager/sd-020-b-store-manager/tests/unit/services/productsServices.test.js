const sinon = require('sinon');
const { expect } = require('chai');

const productsModels = require('../../../models/productsModel');
const productsServices = require('../../../services/productsService');

describe('Testando ProductsService', () => {
  beforeEach(sinon.restore)
  describe('Verifica se a função "getAll"', () => {
    it('Se retorna um objeto com chaves "code:200" e "result: resultado do BD"', async () => {
      const fakeProducts = [{ id: 1, name: "Bola de Futebol" }, { id: 2, name: "Controle Ps5" }]
      sinon.stub(productsModels, 'getAll').resolves(fakeProducts);
      const result = await productsServices.getAll();
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'result');
      expect(result.code).to.be.equal(200);
      expect(result.result).to.be.equal(fakeProducts);
    });
  });
  describe('Verifica se a função "getById"', () => {
    it('Se id existe no BD retorna um objeto com chaves "code:200" e "result: resultado do BD"', async () => {
      const fakeProduct = { id: 1, name: "Bola de Futebol" };
      sinon.stub(productsModels, 'getById').resolves(fakeProduct);
      const result = await productsServices.getById(1)
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'result');
      expect(result.code).to.be.equal(200);
      expect(result.result).to.be.equal(fakeProduct);
    });
    it('Se id não existe no BD retorna um objeto com chaves "code:404" e "message: Product not found"', async () => {
      sinon.stub(productsModels, 'getById').resolves(null);
      const result = await productsServices.getById(1)
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'message');
      expect(result.code).to.be.equal(404);
      expect(result.message).to.be.a('string');
      expect(result.message).to.be.equal('Product not found');
    });
  });
  describe('Verifica se a função "create"', () => {
    it('Se ao passar um "name" válido retorna um objeto com chaves "code:200" e "id: id do produto inserido"', async () => {
      const fakeId = { id: 1 };
      const fakeName = 'Controle Ps5';
      sinon.stub(productsModels, 'create').resolves(fakeId);
      const result = await productsServices.create(fakeName);
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'id');
      expect(result.code).to.be.equal(201);
      expect(result.id).to.be.equal(fakeId.id);
    });
    it('Se não passar um "name" retorna um objeto com chaves "code:400" e "message: mensagem de erro"', async () => {
      const fakeName = '';
      const message = '"name" is required';
      const result = await productsServices.create(fakeName);
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'message');
      expect(result.code).to.be.equal(400);
      expect(result.message).to.be.equal(message);
    });
    it('Se passar um "name" com menos de 5 caracteres retorna um objeto com chaves "code:422" e "message: mensagem de erro"', async () => {
      const fakeName = 'test';
      const message = '"name" length must be at least 5 characters long';
      const result = await productsServices.create(fakeName);
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'message');
      expect(result.code).to.be.equal(422);
      expect(result.message).to.be.equal(message);
    });
  });
  describe('Verifica se a função "update"', () => {
    it('Se ao passar um "name" válido e o "id" do produto desejado se retorna um objeto com chave "code:200"', async () => {
      const fakeId = 1 ;
      const fakeName = 'Controle Ps5';
      sinon.stub(productsModels, 'getById').resolves({id: fakeId,name:'Martelo de Thor'});
      sinon.stub(productsModels, 'update').resolves();
      const result = await productsServices.update(fakeName,fakeId);
      expect(result).to.be.a('object');
      expect(result).to.have.property('code');
      expect(result.code).to.be.equal(200);
    });
    it('Se não passar um "name" retorna um objeto com chaves "code:400" e "message: mensagem de erro"', async () => {
      const fakeName = '';
      const fakeId = 1 ;
      const message = '"name" is required';
      const result = await productsServices.update(fakeName,fakeId);
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'message');
      expect(result.code).to.be.equal(400);
      expect(result.message).to.be.equal(message);
    });
    it('Se passar um "name" com menos de 5 caracteres retorna um objeto com chaves "code:422" e "message: mensagem de erro"', async () => {
      const fakeName = 'test';
      const fakeId = 1 ;
      const message = '"name" length must be at least 5 characters long';
      const result = await productsServices.update(fakeName,fakeId);
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'message');
      expect(result.code).to.be.equal(422);
      expect(result.message).to.be.equal(message);
    });
    it('Se o "id" fornecido não for encontrado no BD retorna um objeto com chaves "code:404" e "message: mensagem de erro"', async () => {
      const fakeId = 1;
      const fakeName = 'Controle Ps5';
      const message = 'Product not found';
      sinon.stub(productsModels,'getById').resolves(null)
      const result = await productsServices.update(fakeName,fakeId);
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'message');
      expect(result.code).to.be.equal(404);
      expect(result.message).to.be.equal(message);
    });
  });
  describe('Verifica se a função "deleteById"', () => {
    it('Se ao passar um "id" válido do produto se retorna um objeto com chave "code:204"', async () => {
      const fakeId = 1 ;
      sinon.stub(productsModels, 'getById').resolves({id: fakeId,name:'Martelo de Thor'});
      sinon.stub(productsModels, 'deleteById').resolves();
      const result = await productsServices.deleteById(fakeId);
      expect(result).to.be.a('object');
      expect(result).to.have.property('code');
      expect(result.code).to.be.equal(204);
    });
    it('Se o "id" fornecido não for encontrado no BD retorna um objeto com chaves "code:404" e "message: mensagem de erro"', async () => {
      const fakeId = 1;
      const message = 'Product not found';
      sinon.stub(productsModels,'getById').resolves(null)
      const result = await productsServices.deleteById(fakeId);
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'message');
      expect(result.code).to.be.equal(404);
      expect(result.message).to.be.equal(message);
    });
  });
});