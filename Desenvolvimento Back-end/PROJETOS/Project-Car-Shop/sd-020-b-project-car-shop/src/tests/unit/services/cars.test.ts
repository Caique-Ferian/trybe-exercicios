import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import {ZodError} from 'zod';
import CarModel from '../../../models/Cars';
import CarsService from '../../../services/CarsService';
import {carMock, carMockWithId, carMockUpdate, carMockUpdatedWithId} from '../../mocks/carsMock';

describe('Cars Service', () => {
  const carModel = new CarModel();
  const carsService = new CarsService(carModel);
  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'readOne')
    .onCall(0)
    .resolves(carMockWithId)
    .onCall(1)
    .resolves(null);
    sinon.stub(carModel, 'update')
    .onCall(0)
    .resolves(carMockUpdatedWithId)
    .onCall(1)
    .resolves(null);
    sinon.stub(carModel, 'delete')
    .onCall(0)
    .resolves(carMockWithId)
    .onCall(1)
    .resolves(null);
  });

  after(()=>{
    sinon.restore();
  })
  describe('Create a Car', () => {
    it('With success', async () => {
      const {code, documents} = await carsService.create(carMock);
      expect(code).to.be.eq(201);
      expect(documents).to.be.deep.equal(carMockWithId);
    });

    it('Failure with empty object', async () => {
      let error;
      try{
        await carsService.create({});
      } catch(err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('Read all Cars', () => {
    it('With success', async () => {
      const {code, documents} = await carsService.read();
      expect(code).to.be.eq(200);
      expect(documents).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('Read one Car', () => {
    it('With success', async () => {
      const {code, documents} = await carsService.readOne(carMockWithId._id);
      expect(code).to.be.eq(200);
      expect(documents).to.be.deep.equal(carMockWithId);
    });

    it('Failure with invalid _id', async () => {
      let error;
      try{
        await carsService.readOne(carMockWithId._id);
      } catch(err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
    });
  });

  describe('Update a Car', () => {
    it('With success', async () => {
      const {code, documents} = await carsService.update(carMockUpdatedWithId._id,carMockUpdate);
      expect(code).to.be.eq(200);
      expect(documents).to.be.deep.equal(carMockUpdatedWithId);
    });

    it('Failure with empty object', async () => {
      let error;
      try{
        await carsService.update(carMockUpdatedWithId._id,{});
      } catch(err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('Delete one Car', () => {
    it('With success', async () => {
      const { code } = await carsService.delete(carMockWithId._id);
      expect(code).to.be.eq(204);
    });

    it('Failure with invalid _id', async () => {
      let error;
      try{
        await carsService.delete(carMockWithId._id);
      } catch(err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
    });
  });

});