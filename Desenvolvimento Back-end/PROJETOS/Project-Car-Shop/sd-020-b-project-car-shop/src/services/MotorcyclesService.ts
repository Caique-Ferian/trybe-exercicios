import IService, { IResponse } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import motorcycleZodSchema, { IMotorcycle } from '../interfaces/IMotorcycle';

export default class MotorcyclesService implements IService<IMotorcycle> {
  constructor(private _motorcycles: IModel<IMotorcycle>) {}

  public async create(obj: Partial<IMotorcycle>): Promise<IResponse<IMotorcycle>> {
    const parsed = motorcycleZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const newCar = await this._motorcycles.create(obj);
    return { code: 201, documents: newCar };
  }

  public async read(): Promise<IResponse<IMotorcycle>> {
    const allCars = await this._motorcycles.read();
    return { code: 200, documents: allCars };
  }

  public async readOne(_id: string): Promise<IResponse<IMotorcycle>> {
    if (_id.length < 24) throw new Error('invalidMongoId');
    const car = await this._motorcycles.readOne(_id);
    if (!car) throw new Error('entityNotFound');
    return { code: 200, documents: car };
  }

  public async update(_id: string, obj: Partial<IMotorcycle>): Promise<IResponse<IMotorcycle>> {
    const parsed = motorcycleZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    if (_id.length < 24) throw new Error('invalidMongoId');
    const car = await this._motorcycles.update(_id, obj);
    if (!car) throw new Error('entityNotFound');
    return { code: 200, documents: car }; 
  }
  
  public async delete(_id: string): Promise<IResponse<IMotorcycle>> {
    if (_id.length < 24) throw new Error('invalidMongoId');
    const car = await this._motorcycles.delete(_id);
    if (!car) throw new Error('entityNotFound');
    return { code: 204 }; 
  }
}