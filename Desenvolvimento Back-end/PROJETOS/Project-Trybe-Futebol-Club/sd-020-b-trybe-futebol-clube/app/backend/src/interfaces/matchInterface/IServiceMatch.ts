import Matches from '../../database/models/MatchModel';

export type Score = {
  homeTeamGoals?: number;
  awayTeamGoals?: number;
};
export interface IMatch extends Matches{
  teamHome?: { teamName: string },
  teamAway?: { teamName: string },

}

export interface ICreateMatch {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export type result = {
  code: number
  matches?: IMatch[],
  newMatch?: ICreateMatch
  message?: string
};

export default interface IServiceMatch {
  findAll(inProgress: boolean | undefined): Promise<result>
  create(match:ICreateMatch): Promise<result>
  update(id:number, score: Score | null): Promise<result>
}
