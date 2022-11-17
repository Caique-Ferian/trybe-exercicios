import { expect } from 'chai';
import sinon from 'sinon';
import LensModel from '../../../models/Lens'
import { Model } from 'mongoose';
import { lensMock, lensMockWithId } from '../../mocks/LensMock';


describe('LensModel', () => {
    const lensModel = new LensModel();
    beforeEach(sinon.restore);
    
    describe('creating a new lens', () => {
        it('successfully creates', async () => {
            sinon.stub(Model,'create').resolves(lensMockWithId);
            const newLens = await lensModel.create(lensMock);
            expect(newLens).to.be.deep.eq(lensMockWithId);
        });
    });

    describe('searching a lens', () => {
        it('successfully found', async () => {
            sinon.stub(Model,'findOne').resolves(lensMockWithId);
            const lens = await lensModel.readOne(lensMockWithId._id);
            expect(lens).to.be.deep.eq(lensMockWithId);
        });

        it('_id not found', async () => {
            sinon.stub(Model,'findOne').resolves(lensMockWithId);
            try{
                await lensModel.readOne('123456');
            } catch(e: any) {
                expect(e.message).to.be.deep.eq('InvalidMongoId');
            }
        });
    });

    describe('searching all lens', () => {
        it('successfully found', async () => {
            sinon.stub(Model,'find').resolves([lensMockWithId]);
            const allLens = await lensModel.read();
            expect(allLens).to.be.deep.eq([lensMockWithId]);
        });
    });

    describe('deleting a lens', () => {
        it('successfully deleted', async () => {
            sinon.stub(Model,'findByIdAndDelete').resolves(lensMockWithId);
            const deletedLens = await lensModel.destroy(lensMockWithId._id);
            expect(deletedLens).to.be.deep.eq(lensMockWithId);
        });

        it('_id not found', async () => {
            sinon.stub(Model,'findByIdAndDelete').resolves(lensMockWithId);
            try{
                await lensModel.readOne('123456');
            } catch(e: any) {
                expect(e.message).to.be.deep.eq('InvalidMongoId');
            }
        });
    });
});