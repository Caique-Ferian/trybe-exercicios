import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import TeamService from '../api/services/team/TeamService';

import IModelTeam from '../interfaces/teamInterface/IModelTeam';
import Teams from '../database/models/TeamModel';
import fakeTeams from '../api/utils/teamConsts'

const { expect } = chai;

describe('Testando Team', () => {
  const teamModel: IModelTeam<Teams> = {
    findAll: sinon.stub().resolves(fakeTeams),
    findByPk: sinon.stub().resolves({id:1,teamName:'Avaí/Kindermann'})
  }
  const teamService = new TeamService(teamModel);
  beforeEach(sinon.restore);
  
  describe('Testando TeamService', () => {
    it('Retorna um array de objetos dos times encontrado em caso de sucesso e uma chave code: 200', async () => {
      const response = await teamService.findAll();
      expect(response.team).to.have.length(3);
      expect(response.code).to.be.eq(200);

    });
    
    it('Retorna uma objeto do time de acordo com Id e uma chave code: 200', async () => {
      const fakeId = 1;
      const response = await teamService.findByPk(fakeId);
      expect(response.code).to.be.eq(200);
      expect(response.team).to.be.have.keys('id','teamName');

    });
  })
});
