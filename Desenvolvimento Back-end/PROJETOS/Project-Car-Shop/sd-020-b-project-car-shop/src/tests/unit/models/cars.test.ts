
import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/Cars';
import {Model} from 'mongoose';
import { carMock, carMockWithId, carMockUpdate, carMockUpdatedWithId } from '../../mocks/carsMock';

describe('Car Model', () => {
  const carModel = new CarModel();
  before(async () => {
    sinon.stub(Model,'create').resolves(carMockWithId);
    sinon.stub(Model,'find').resolves([carMockWithId]);
    sinon.stub(Model,'findOne')
    .onCall(0)
    .resolves(carMockWithId)
    .onCall(1)
    .resolves(null);
    sinon.stub(Model, 'findByIdAndUpdate')
    .onCall(0)
    .resolves(carMockUpdatedWithId)
    .onCall(1)
    .resolves(null);
    sinon.stub(Model, 'findByIdAndDelete')
    .onCall(0)
    .resolves(carMockWithId)
    .onCall(1)
    .resolves(null);
  });

  after(()=>{
    sinon.restore();
  })
  describe('Create a car', () => {
    it('Successfully', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('Find all cars', () => {
    it('Successfully', async () => {
      const allCars = await carModel.read();
      expect(allCars).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('Find one car', () => {
    it('Successfully', async () => {
      const car = await carModel.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('Failure', async () => {
      const car = await carModel.readOne(carMockWithId._id);
      expect(car).to.be.null;
    });
  });

  describe('Update one car', () => {
    it('Successfully', async () => {
      const updatedCar = await carModel.update(carMockWithId._id,carMockUpdate);
      expect(updatedCar).to.be.deep.equal(carMockUpdatedWithId);
    });

    it('Failure', async () => {
      const updatedCar = await carModel.update(carMockWithId._id,carMockUpdate);
      expect(updatedCar).to.be.null;
    });
  });

  describe('Delete one car', () => {
    it('Successfully', async () => {
      const deletedCar = await carModel.delete(carMockWithId._id);
      expect(deletedCar).to.be.deep.equal(carMockWithId);
    });

    it('Failure', async () => {
      const deletedCar = await carModel.delete(carMockWithId._id);
      expect(deletedCar).to.be.null;
    });
  });

}); 