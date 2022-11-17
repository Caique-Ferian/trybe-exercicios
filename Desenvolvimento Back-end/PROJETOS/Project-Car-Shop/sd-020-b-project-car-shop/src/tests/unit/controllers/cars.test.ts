import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Request, Response} from 'express';
import {carMock, carMockWithId, carMockUpdate, carMockUpdatedWithId} from '../../mocks/carsMock';
import CarsController from '../../../controllers/CarsController';
import CarsService from '../../../services/CarsService';
import CarModel from '../../../models/Cars';
import {ZodError} from 'zod';

describe('Cars Controller', () => {
    const carModel = new CarModel();
    const carsService = new CarsService(carModel);
    const carsController = new CarsController(carsService);
    const req = {} as Request;
    const res = {} as Response;
  before(async () => {
    sinon.stub(carsService, 'create').resolves({code: 201, documents: carMockWithId});
    sinon.stub(carsService, 'read').resolves({code: 200, documents: [carMockWithId]});
    sinon.stub(carsService, 'readOne').resolves({code: 200, documents: carMockWithId});
    sinon.stub(carsService, 'update').resolves({code: 200, documents: carMockUpdatedWithId});
    sinon.stub(carsService, 'delete').resolves({ code: 204 });


    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Create a Car',() => {
      it('With Success', async () => {
            req.body = carMock;
            await carsController.create(req,res);
            expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
            expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
      });
    });
  describe('Read all Cars',() => {
    it('With Success', async () => {
          await carsController.read(req,res);
          expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
          expect((res.json as sinon.SinonStub).calledWith([carMockWithId])).to.be.true;
    });
  });

  describe('Read one Car',() => {
    it('With Success', async () => {
          req.params = { id: carMockWithId._id };
          await carsController.readOne(req,res);
          expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
          expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });


  describe('Update one Car',() => {
    it('With Success', async () => {
          req.params = { id: carMockWithId._id };
          req.body = carMockUpdate;
          await carsController.update(req,res);
          expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
          expect((res.json as sinon.SinonStub).calledWith(carMockUpdatedWithId)).to.be.true;
    });
  });

  describe('Delete one Car',() => {
    it('With Success', async () => {
          req.params = { id: carMockWithId._id };
          await carsController.delete(req,res);
          expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
          expect((res.end as sinon.SinonStub).calledWith()).to.be.true;
    });
  });
});