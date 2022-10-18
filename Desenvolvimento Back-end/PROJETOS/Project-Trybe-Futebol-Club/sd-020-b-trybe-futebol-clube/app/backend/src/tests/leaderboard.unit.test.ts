import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import LeaderboardService from '../api/services/leaderboard/LeaderboardService';
import { fakeTeamHome, fakeLeaderboardHome, fakeTeamAway, fakeLeaderboardAway } from '../api/utils/leaderboardConsts';
import IModelLeaderboard from '../interfaces/leaderboardInterface/IModelLeaderboard';

const { expect } = chai;

describe('Testando Leaderboard', () => {
  beforeEach(sinon.restore);
  
  const LeaderboardModel: IModelLeaderboard = {
    findAllHome: sinon.stub().resolves(fakeTeamHome),
    findAllAway: sinon.stub().resolves(fakeTeamAway),
  };
  const leaderboardService = new LeaderboardService(LeaderboardModel);
  
  describe('Testando LeaderboardService', () => {
    describe('Testando função findAllHome', () => {

      it('Retorna um array de objetos do placar dos times encontradas e uma chave code: 200', async () => {
        const response = await leaderboardService.home();
        if(response.leaderboard) {
              const {name} = response.leaderboard[0];
              expect(response.leaderboard).to.have.length(2);
              expect(name).to.be.eq(fakeLeaderboardHome[0].name)
              expect(response.code).to.be.eq(200);
        }
      });
    })
    describe('Testando função findAllAway', () => {

      it('Retorna um array de objetos do placar dos times encontradas e uma chave code: 200', async () => {
        const response = await leaderboardService.away();
        if(response.leaderboard) {
              const {name} = response.leaderboard[0];
              expect(response.leaderboard).to.have.length(2);
              expect(name).to.be.eq(fakeLeaderboardAway[0].name)
              expect(response.code).to.be.eq(200);
        }
      });
    })
  });
});

