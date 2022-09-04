const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/salesService');
const salesControllers = require('../../../controllers/salesController');

describe('Testando SalesControllers', () => {
  beforeEach(sinon.restore)
  describe('Verifica se a rota GET "/sales"', () => {
    const req = {};
    const res = {};
    it('Se retorna status "200" e um array de objetos através "res.json"', async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
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
      sinon.stub(salesServices, 'getAll').resolves({ code: 200, result: fakeSales });
      await salesControllers.getAll(req,res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(fakeSales)).to.be.true;
    });
  });
  describe('Verifica se a rota GET "/sales/:id"', () => {
    const req = {};
    const res = {};
    it('Se id existe no BD retorna status "200" e o array de objetos vindo do BD através "res.json"', async () => {
      req.params = {id: 1}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
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
      sinon.stub(salesServices, 'getById').resolves({ code: 200, result: fakeSales });
      await salesControllers.getById(req,res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(fakeSales)).to.be.true;
    });
    it('Se id não existe no BD retorna status "404" e um objeto com mensagem de erro através "res.json"', async () => {
      req.params = {id: 1}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const message = 'Sale not found';
      sinon.stub(salesServices, 'getById').resolves({code:404,message});
      await salesControllers.getById(req,res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({message})).to.be.true;
    });
  });
  describe('Verifica se a rota POST "/products"', () => {
    const req = {};
    const res = {};
    it('Se "name" válido retorna status "201" e o objeto com chaves "id" e "name" através "res.json"', async () => {
      const id = 1;
      req.body = [{"productId": 1,"quantity":1},
        {"productId": 2, "quantity":5}
      ];
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'create').resolves({code:201,id});
      await salesControllers.create(req,res);
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ id, itemsSold: req.body})).to.be.true;
    });
    it('Se houver um erro retorna status diferente de "201" e objeto com mensagem de erro através "res.json"', async () => {
      const message = '"productId" is required';
      req.body = [{"quantity":1}];
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'create').resolves({code:400,message});
      await salesControllers.create(req,res);
      expect(res.status.calledWith(201)).to.be.false;
      expect(res.json.calledWith({message})).to.be.true;
    });
  });
});