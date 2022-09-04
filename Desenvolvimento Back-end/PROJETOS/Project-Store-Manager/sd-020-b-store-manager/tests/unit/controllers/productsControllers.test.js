const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../services/productsService');
const productsControllers = require('../../../controllers/productsController');

describe('Testando ProductsControllers', () => {
  beforeEach(sinon.restore)
  describe('Verifica se a rota GET "/products"', () => {
    const req = {};
    const res = {};
    it('Se retorna status "200" e um array de objetos através "res.json"', async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const fakeProducts = [{ id: 1, name: "Bola de Futebol" }, { id: 2, name: "Controle Ps5" }]
      sinon.stub(productsServices, 'getAll').resolves({code:200,result: fakeProducts});
      await productsControllers.getAll(req,res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(fakeProducts)).to.be.true;
    });
  });
  describe('Verifica se a rota GET "/products/:id"', () => {
    const req = {};
    const res = {};
    it('Se id existe no BD retorna status "200" e o objeto vindo do BD através "res.json"', async () => {
      req.params = {id: 1}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const fakeProduct = { id: 1, name: "Bola de Futebol" };
      sinon.stub(productsServices, 'getById').resolves({code:200,result: fakeProduct});
      await productsControllers.getById(req,res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(fakeProduct)).to.be.true;
    });
    it('Se id não existe no BD retorna status "404" e um objeto com mensagem de erro através "res.json"', async () => {
      req.params = {id: 1}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const message = 'Product not found';
      sinon.stub(productsServices, 'getById').resolves({code:404,message});
      await productsControllers.getById(req,res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({message})).to.be.true;
    });
  });
  describe('Verifica se a rota POST "/products"', () => {
    const req = {};
    const res = {};
    it('Se "name" válido retorna status "201" e o objeto com chaves "id" e "name" através "res.json"', async () => {
      const name = 'Controle Ps5 ';
      const id = 1;
      req.body = { name };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'create').resolves({code:201,id});
      await productsControllers.create(req,res);
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({id,name})).to.be.true;
    });
    it('Se houver um erro retorna status diferente de "201" e objeto com mensagem de erro através "res.json"', async () => {
      const name = '';
      const message = '"name" is required';
      req.body = { name };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'create').resolves({code:400,message});
      await productsControllers.create(req,res);
      expect(res.status.calledWith(201)).to.be.false;
      expect(res.json.calledWith({message})).to.be.true;
    });
  });
  describe('Verifica se a rota PUT "/products/:id"', () => {
    const req = {};
    const res = {};
    it('Se "name" e "id" do produto desejado válido retorna status "200" e o objeto com chaves "id" e "name" através "res.json"', async () => {
      const name = 'Controle Ps5 ';
      const id = 1;
      req.params = { id };
      req.body = { name };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'update').resolves({ code:200 });
      await productsControllers.update(req,res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({id,name})).to.be.true;
    });
    it('Se houver um erro retorna status diferente de "200" e objeto com mensagem de erro através "res.json"', async () => {
      const name = '';
      const id = 1;
      const message = '"name" is required';
      req.body = { name };
      req.params = { id };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'update').resolves({code:400,message});
      await productsControllers.update(req,res);
      expect(res.status.calledWith(200)).to.be.false;
      expect(res.json.calledWith({message})).to.be.true;
    });
  });
  describe('Verifica se a rota DELETE "/products/:id"', () => {
    const req = {};
    const res = {};
    it('Se o "id" do produto desejado válido retorna status "204" e se "res.end" foi chamado', async () => {
      const id = 1;
      req.params = { id };
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(productsServices, 'deleteById').resolves({ code:204 });
      await productsControllers.deleteById(req,res);
      expect(res.status.calledWith(204)).to.be.true;
      expect(res.end.calledWith()).to.be.true;
    });
    it('Se "id" não encontrado no BD retorna status "404" e objeto com mensagem de erro através "res.json"', async () => {
      const id = 1;
      const message = 'Product not found';
      req.params = { id };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'deleteById').resolves({code:404,message});
      await productsControllers.deleteById(req,res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({message})).to.be.true;
    });
  });
});