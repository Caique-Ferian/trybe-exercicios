const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModels = require('../../../models/productsModel');

describe('Testando ProductsModel', () => {
  beforeEach(sinon.restore)
  describe('Verifica se a função "getAll"', () => {
    it('Se retorna um array de objetos', async () => {
      const fakeProducts = [{ id: 1, name: "Bola de Futebol" }, { id: 2, name: "Controle Ps5" }]
      sinon.stub(connection, 'execute').resolves([fakeProducts]);
      const result = await productsModels.getAll();
      expect(result).to.be.a('array');
      expect(result.length).to.be.equal(2);
      expect(result).to.be.equal(fakeProducts);
    });
  });
  describe('Verifica se a função "getById"', () => {
    it('Se id existe no BD retorna um objeto', async () => {
      const fakeProduct = { id: 1, name: "Bola de Futebol" };
      sinon.stub(connection, 'execute').resolves([[fakeProduct]]);
      const result = await productsModels.getById(1)
      expect(result).to.be.a('object');
      expect(result).to.be.equal(fakeProduct);
    });
    it('Se id não existe no BD retorna "NULL"', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      const result = await productsModels.getById(1)
      expect(result).to.be.null;
    });
  });
  describe('Verifica se a função "create"', () => {
    it('Se ao informar um "name" cria um novo produto e retorna o "id" do produto criado', async () => {
      const fakeId = { insertId: 1 };
      const fakeName = 'Controle Ps5';
      sinon.stub(connection, 'execute').resolves([fakeId]);
      const result = await productsModels.create(fakeName);
      expect(result).to.be.a('object');
      expect(result).to.have.a.property('id');
    });
  });
  describe('Verifica se a função "update"', () => {
    it('Se ao informar um "name" e o "id" deseja se atualiza o produto e retorna o "id" do produto atualizado', async () => {
      const fakeId = { id: 1 };
      const fakeName = 'Controle Ps5';
      sinon.stub(connection, 'execute').resolves([fakeId]);
      const result = await productsModels.update(fakeName,fakeId.id);
      expect(result).to.be.a('object');
      expect(result).to.have.a.property('id');
    });
  });
  describe('Verifica se a função "deleteById"', () => {
    it('Se ao informar o "id" desejado se deleta o produto do respectivo "id" e retorna o "id" do produto deletado', async () => {
      const fakeId = { id: 1 };
      sinon.stub(connection, 'execute').resolves([fakeId]);
      const result = await productsModels.deleteById(fakeId.id);
      expect(result).to.be.a('object');
      expect(result).to.have.a.property('id');
    });
  });
});