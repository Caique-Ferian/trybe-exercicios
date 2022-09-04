const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModels = require('../../../models/salesModel');

describe('Testando SalesModel', () => {
  beforeEach(sinon.restore)
  describe('Verifica se a função "getAll"', () => {
    it('Se retorna um array de objetos', async () => {
      const fakeSales = [{
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ];
      sinon.stub(connection, 'execute').resolves([fakeSales]);
      const result = await salesModels.getAll();
      expect(result).to.be.a('array');
      expect(result.length).to.be.equal(2);
      expect(result).to.be.equal(fakeSales);
    });
  });
  describe('Verifica se a função "getById"', () => {
    it('Se id existe no BD retorna um array de objetos', async () => {
      const fakeSales = [{
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ];
      sinon.stub(connection, 'execute').resolves([fakeSales]);
      const result = await salesModels.getById(1)
      expect(result).to.be.a('array');
      expect(result.length).to.be.equal(2);
      expect(result).to.be.equal(fakeSales);
    });
    it('Se id não existe no BD retorna "NULL"', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      const result = await salesModels.getById(1)
      expect(result).to.be.null;
    });
  });
  describe('Verifica se a função "newSale"', () => {
    it('Se ao ser chamada cria uma nova data na tabela sales e retorna o Id de inserção', async () => {
      const fakeId = [{insertId: 1}];
      sinon.stub(connection, 'execute').resolves(fakeId);
      const result =await salesModels.newSale();
      expect(result).to.have.a.property('insertId');
      expect(result.insertId).to.be.eq(fakeId[0].insertId)
    });
  });
  describe('Verifica se a função "create"', () => {
    it('Se ao informar "saleId, productId e quantity" cria uma nova venda', async () => {
      const fakeObj = {
        quantity: 1,
        insertId: 1,
        productId: 1
      };
      sinon.stub(connection, 'execute').resolves([fakeObj]);
      const result = await salesModels.create(fakeObj.quantity,fakeObj.insertId,fakeObj.productId);
      expect(result).to.have.all.keys('quantity','insertId','productId');
    });
  });
});