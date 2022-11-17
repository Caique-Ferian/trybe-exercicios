import { model, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import CsModel from './CsModel';

const motorcycleMongooseSchema = new Schema<IMotorcycle>({
  status: { type: Boolean, required: false },
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

export default class Motorcycles extends CsModel<IMotorcycle> {
  constructor(csModel = model('Motorcycles', motorcycleMongooseSchema)) {
    super(csModel);
  }
}