import { model, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import CsModel from './CsModel';

const carsMongooseSchema = new Schema<ICar>({
  status: { type: Boolean, required: false },
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

export default class Cars extends CsModel<ICar> {
  constructor(csModel = model('Cars', carsMongooseSchema)) {
    super(csModel);
  }
}