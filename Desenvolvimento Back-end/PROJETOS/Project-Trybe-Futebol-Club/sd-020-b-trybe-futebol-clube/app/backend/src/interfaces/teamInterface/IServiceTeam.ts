import Teams from '../../database/models/TeamModel';

export type result = {
  code: number
  team?: Teams[] | Teams,
  message?: string
};

export default interface IServiceTeam {
  findAll(): Promise<result>
  findByPk(id:number): Promise<result>
}
