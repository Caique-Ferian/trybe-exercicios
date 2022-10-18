import { Model } from 'sequelize';
import ILogin from './ILogin';

export default interface IModelUser<T extends Model>{
  findOne(modelAttributes: ILogin): Promise<T | null>;
}
