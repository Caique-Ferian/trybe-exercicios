import IService, { IResponse } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import carZodSchema, { ICar } from '../interfaces/ICar';

export default class CarsService implements IService<ICar> {
  constructor(private _cars: IModel<ICar>) {}

  public async create(obj: Partial<ICar>): Promise<IResponse<ICar>> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const newCar = await this._cars.create(obj);
    return { code: 201, documents: newCar };
  }

  public async read(): Promise<IResponse<ICar>> {
    const allCars = await this._cars.read();
    return { code: 200, documents: allCars };
  }

  public async readOne(_id: string): Promise<IResponse<ICar>> {
    if (_id.length < 24) throw new Error('invalidMongoId');
    const car = await this._cars.readOne(_id);
    if (!car) throw new Error('entityNotFound');
    return { code: 200, documents: car };
  }

  public async update(_id: string, obj: Partial<ICar>): Promise<IResponse<ICar>> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    if (_id.length < 24) throw new Error('invalidMongoId');
    const car = await this._cars.update(_id, obj);
    if (!car) throw new Error('entityNotFound');
    return { code: 200, documents: car }; 
  }
  
  public async delete(_id: string): Promise<IResponse<ICar>> {
    if (_id.length < 24) throw new Error('invalidMongoId');
    const car = await this._cars.delete(_id);
    if (!car) throw new Error('entityNotFound');
    return { code: 204 }; 
  }
}