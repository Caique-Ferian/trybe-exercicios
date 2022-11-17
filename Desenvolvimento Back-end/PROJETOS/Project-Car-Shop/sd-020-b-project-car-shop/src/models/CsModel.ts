import { Model, UpdateQuery, isValidObjectId } from 'mongoose';
import { IModel } from '../interfaces/IModel';

export default abstract class CsModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj: Partial<T>): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) return null;
    return this._model.findOne({ _id });
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) return null;
    return this._model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }
  
  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) return null;
    return this._model.findByIdAndDelete({ _id });
  }
}
