import { Model } from 'sequelize';
import { ICreateMatch, Score } from './IServiceMatch';

export default interface IModelMatch<T extends Model> {
  findAll(inProgress: boolean | undefined): Promise<T[]>
  create(match:ICreateMatch): Promise<T | null>
  update(id:number, score : Score | null): Promise<ICreateMatch | boolean | null>
}
