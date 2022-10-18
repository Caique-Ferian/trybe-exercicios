import { Model } from 'sequelize';

export default interface IModelTeam<T extends Model> {
  findAll(): Promise<T[]>
  findByPk(id:number): Promise<T | null>
}
