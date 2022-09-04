const sinon = require('sinon');
const { expect } = require('chai');

const salesModels = require('../../../models/salesModel');
const salesServices = require('../../../services/salesService');
const productsModels = require('../../../models/productsModel');

describe('Testando SalesService', () => {
  beforeEach(sinon.restore)
    describe('Verifica se a função "serialize"', () => {
    it('Se ao passar um objeto com 4 chaves em "snake case" se os retorna em "camel case"', () => {
      const fakeSale = {
        "sale_id": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "product_id": 1,
        "quantity": 2
      };
      const result = {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      };
      const serialize = salesServices.serialize(fakeSale);
      expect(serialize).to.be.a('object');
      expect(serialize).to.have.all.keys('saleId', 'date', 'productId', 'quantity');
      expect(serialize.saleId).to.be.equal(fakeSale.sale_id);
      expect(serialize.date).to.be.equal(fakeSale.date);
      expect(serialize.productId).to.be.equal(fakeSale.product_id);
      expect(serialize.quantity).to.be.equal(fakeSale.quantity);
    });
    it('Se ao passar um objeto com 4 chaves em "snake case" se os retorna em "camel case"', () => {
      const fakeSale = {
        "date": "2021-09-09T04:54:29.000Z",
        "product_id": 1,
        "quantity": 2
      };
      const result = {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      };
      const serialize = salesServices.serialize(fakeSale);
      expect(serialize).to.be.a('object');
      expect(serialize).to.have.all.keys('date', 'productId', 'quantity');
      expect(serialize.date).to.be.equal(fakeSale.date);
      expect(serialize.productId).to.be.equal(fakeSale.product_id);
      expect(serialize.quantity).to.be.equal(fakeSale.quantity);
    });
  });
  describe('Verifica se a função "getAll"', () => {
    it('Se retorna um objeto com chaves "code:200" e "result: resultado do BD"', async () => {
      const fakeSales = [{
          "sale_id": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "product_id": 1,
          "quantity": 2
        },
        {
          "sale_id": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "product_id": 2,
          "quantity": 2
        }
      ];
      sinon.stub(salesModels, 'getAll').resolves(fakeSales);
      const result = await salesServices.getAll();
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'result');
      expect(result.code).to.be.equal(200);
      expect(result.result.length).to.be.equal(2);
    });
  });
  describe('Verifica se a função "getById"', () => {
    it('Se id existe no BD retorna um objeto com chaves "code:200" e "result: resultado do BD"', async () => {
        const fakeSales = [{
          "date": "2021-09-09T04:54:29.000Z",
          "product_id": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "product_id": 2,
          "quantity": 2
        }
      ];
      sinon.stub(salesModels, 'getById').resolves(fakeSales);
      const result = await salesServices.getById(1)
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'result');
      expect(result.code).to.be.equal(200);
      expect(result.result.length).to.be.equal(2);
    });
    it('Se id não existe no BD retorna um objeto com chaves "code:404" e "message: Sale not found"', async () => {
      sinon.stub(salesModels, 'getById').resolves(null);
      const result = await salesServices.getById(1)
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'message');
      expect(result.code).to.be.equal(404);
      expect(result.message).to.be.a('string');
      expect(result.message).to.be.equal('Sale not found');
    });
  });
  describe('Verifica se a função "create"', () => {
    it(`Se ao passar um array de vendas com algum "productId"
    faltando retorna um objeto com chaves "code:400" e "message: "productId" is required"`, async () => {
      const fakeObj = [{ quantity: 1 }];
      const message =  '"productId" is required';
      const result = await salesServices.create(fakeObj);
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'message');
      expect(result.code).to.be.equal(400);
      expect(result.message).to.be.equal(message);
    });
    it(`Se ao passar um array de vendas com algum "quantity"
    faltando retorna um objeto com chaves "code:400" e "message: "quantity" is required"`, async () => {
      const fakeObj = [{ productId: 1 }];
      const message =  '"quantity" is required';
      const result = await salesServices.create(fakeObj);
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'message');
      expect(result.code).to.be.equal(400);
      expect(result.message).to.be.equal(message);
    });
    it(`Se ao passar um array de vendas com algum "quantity" 
    menor que 1 retorna um objeto com chaves "code:422" e "message: "quantity" must be greater than or equal to 1"`, async () => {
      const fakeObj = [{ productId:1, quantity: 0 }];
      const message =  '"quantity" must be greater than or equal to 1';
      const result = await salesServices.create(fakeObj);
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'message');
      expect(result.code).to.be.equal(422);
      expect(result.message).to.be.equal(message);
    });
    it(`Se ao passar um array de vendas com algum "productId" 
    que não exista no BD retorna um objeto com chaves "code:404" e "message: Product not found"`, async () => {
      const fakeObj = [{ productId:1, quantity: 2 }];
      const message = 'Product not found';
      sinon.stub(productsModels, 'getById').resolves(null);
      const result = await salesServices.create(fakeObj);
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'message');
      expect(result.code).to.be.equal(404);
      expect(result.message).to.be.equal(message);
    });
    it(`Se ao passar um array de vendas com algum "productId" 
    que não exista no BD retorna um objeto com chaves "code:404" e "message: Product not found"`, async () => {
      const fakeObj = [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 5 }];
      const fakeId = { insertId: 1 };
      const fakeProducts = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' }
      ];
      sinon.stub(productsModels, 'getById').resolves(fakeProducts);
      sinon.stub(salesModels, 'newSale').resolves(fakeId);
      sinon.stub(salesModels, 'create').resolves([]);
      const result = await salesServices.create(fakeObj);
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'id');
      expect(result.code).to.be.equal(201);
      expect(result.id).to.be.equal(fakeId.insertId);
    });
  });
});