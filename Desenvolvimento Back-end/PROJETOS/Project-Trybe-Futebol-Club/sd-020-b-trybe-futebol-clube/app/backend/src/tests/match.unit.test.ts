import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import MatchService from '../api/services/match/MatchService';
import { fakeMatches,fakeMatchToCreate, fakeScore, fakeUpdatedScore } from '../api/utils/matchConsts';
import IModelMatch from '../interfaces/matchInterface/IModelMatch';
import Matches from '../database/models/MatchModel';

const { expect } = chai;

describe('Testando Matches', () => {
  beforeEach(sinon.restore);
  
  describe('Testando MatchService', () => {
    describe('Testando função findAll com inProgress = undefined', () => {

      const matchModel: IModelMatch<Matches> = {
        findAll: sinon.stub().resolves(fakeMatches),
        create: sinon.stub().resolves(),
        update: sinon.stub().resolves(),
      };
      const matchService = new MatchService(matchModel);
      
      it('Retorna um array de objetos das partidas encontradas e uma chave code: 200', async () => {
        const response = await matchService.findAll(undefined);
        if(response.matches) {
        const {id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress, teamHome, teamAway} = response.matches[0];
        expect(response.matches).to.have.length(3);
        expect(id).to.be.eq(fakeMatches[0].id);
        expect(homeTeam).to.be.eq(fakeMatches[0].homeTeam);
        expect(homeTeamGoals).to.be.eq(fakeMatches[0].homeTeamGoals);
        expect(awayTeam).to.be.eq(fakeMatches[0].awayTeam);
        expect(awayTeamGoals).to.be.eq(fakeMatches[0].awayTeamGoals);
        expect(inProgress).to.be.eq(fakeMatches[0].inProgress);
        expect(teamHome?.teamName).to.be.eq(fakeMatches[0].teamHome.teamName);
        expect(teamAway?.teamName).to.be.eq(fakeMatches[0].teamAway.teamName);
        expect(response.code).to.be.eq(200);
      }
    });
  })

    });
    describe('Testando função findAll com inProgress = false', () => {

      const matchModel: IModelMatch<Matches> = {
        findAll: sinon.stub().resolves(fakeMatches.filter((e) => e.inProgress === false)),
        create: sinon.stub().resolves(),
        update: sinon.stub().resolves(),
      };
      const matchService = new MatchService(matchModel);
    it('Retorna um array de objetos das partidas encontradas e uma chave code: 200', async () => {
      const response = await matchService.findAll(false);
      if(response.matches) {
        const {id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress, teamHome, teamAway} = response.matches[0];
        expect(response.matches).to.have.length(2);
        expect(id).to.be.eq(fakeMatches[0].id);
        expect(homeTeam).to.be.eq(fakeMatches[0].homeTeam);
        expect(homeTeamGoals).to.be.eq(fakeMatches[0].homeTeamGoals);
        expect(awayTeam).to.be.eq(fakeMatches[0].awayTeam);
        expect(awayTeamGoals).to.be.eq(fakeMatches[0].awayTeamGoals);
        expect(inProgress).to.be.eq(fakeMatches[0].inProgress);
        expect(teamHome?.teamName).to.be.eq(fakeMatches[0].teamHome.teamName);
        expect(teamAway?.teamName).to.be.eq(fakeMatches[0].teamAway.teamName);
        expect(response.code).to.be.eq(200);
      }
      });
    });
    describe('Testando função findAll com inProgress = true', () => {

      const matchModel: IModelMatch<Matches> = {
        findAll: sinon.stub().resolves(fakeMatches.filter((e) => e.inProgress === true)),
        create: sinon.stub().resolves(),
        update: sinon.stub().resolves(),
      };
      const matchService = new MatchService(matchModel);
      it('Retorna um array de objetos das partidas encontradas e uma chave code: 200', async () => {
        const response = await matchService.findAll(true);
        if(response.matches) {
          const {id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress, teamHome, teamAway} = response.matches[0];
          expect(response.matches).to.have.length(1);
          expect(id).to.be.eq(fakeMatches[2].id);
          expect(homeTeam).to.be.eq(fakeMatches[2].homeTeam);
          expect(homeTeamGoals).to.be.eq(fakeMatches[2].homeTeamGoals);
          expect(awayTeam).to.be.eq(fakeMatches[2].awayTeam);
          expect(awayTeamGoals).to.be.eq(fakeMatches[2].awayTeamGoals);
          expect(inProgress).to.be.eq(fakeMatches[2].inProgress);
          expect(teamHome?.teamName).to.be.eq(fakeMatches[2].teamHome.teamName);
          expect(teamAway?.teamName).to.be.eq(fakeMatches[2].teamAway.teamName);
          expect(response.code).to.be.eq(200);
        }
        });
      });
      describe('Testando função create', () => { 
        const {id,homeTeam,homeTeamGoals,awayTeam,awayTeamGoals, inProgress} = fakeMatchToCreate;

        describe('Em caso de sucesso', () => {

        const matchModel: IModelMatch<Matches> = {
          findAll: sinon.stub().resolves(),
          create: sinon.stub().resolves(fakeMatchToCreate),
          update: sinon.stub().resolves(),
        };
        const matchService = new MatchService(matchModel);
        it('Retorna um objeto da partida criada e uma chave code: 201', async () => {
          const response = await matchService.create({homeTeam,homeTeamGoals,awayTeam,awayTeamGoals, inProgress});
          if(response.newMatch) {
            expect(response.newMatch.id).to.be.eq(id);
            expect(response.newMatch.homeTeam).to.be.eq(homeTeam);
            expect(response.newMatch.homeTeamGoals).to.be.eq(homeTeamGoals);
            expect(response.newMatch.awayTeam).to.be.eq(awayTeam);
            expect(response.newMatch.awayTeamGoals).to.be.eq(awayTeamGoals);
            expect(response.newMatch.inProgress).to.be.eq(inProgress);
            expect(response.code).to.be.eq(201);
          }
        });
      });
      describe('Em caso de falha', () => {
        
        it('Retorna um objeto com a chave message em caso de homeTeam = awayTeam e uma chave code: 401', async () => {
          const matchModel: IModelMatch<Matches> = {
              findAll: sinon.stub().resolves(),
              create: sinon.stub().resolves(fakeMatchToCreate),
              update: sinon.stub().resolves(),
            };
            const matchService = new MatchService(matchModel);
            const ERROR_MESSAGE = 'It is not possible to create a match with two equal teams';
            const response = await matchService.create({homeTeam:8,homeTeamGoals,awayTeam:8,awayTeamGoals, inProgress});
            expect(response.message).to.be.eq(ERROR_MESSAGE);
            expect(response.code).to.be.eq(401);
          });
          it('Retorna um objeto com a chave message em caso de não existir o time no banco de dados e uma chave code: 404', async () => {
            const matchModel: IModelMatch<Matches> = {
              findAll: sinon.stub().resolves(),
              create: sinon.stub().resolves(null),
              update: sinon.stub().resolves(),
            };
            const matchService = new MatchService(matchModel);
            const ERROR_MESSAGE = 'There is no team with such id!';
            const response = await matchService.create({homeTeam:30,homeTeamGoals,awayTeam:8,awayTeamGoals, inProgress});
            expect(response.message).to.be.eq(ERROR_MESSAGE);
            expect(response.code).to.be.eq(404);
          });
        });
      });

      describe('Testando função update', () => { 
        const fakeId = 1;
        describe('Em caso de sucesso', () => {
        it('Retorna um objeto com a chave message e uma chave code: 200 se score = null', async () => {
          const matchModel: IModelMatch<Matches> = {
            findAll: sinon.stub().resolves(),
            create: sinon.stub().resolves(),
            update: sinon.stub().resolves(true),
          };
          const matchService = new MatchService(matchModel);
  
          const UPDATED_MESSAGE = 'Finished';
          const response = await matchService.update(fakeId,null);
          expect(response.code).to.be.eq(200);
          expect(response.message).to.be.eq(UPDATED_MESSAGE)
        });

        it('Retorna um objeto com o score atualizado e uma chave code: 200 se score != null', async () => {
          const matchModel: IModelMatch<Matches> = {
            findAll: sinon.stub().resolves(),
            create: sinon.stub().resolves(),
            update: sinon.stub().resolves(fakeUpdatedScore),
          };
          const matchService = new MatchService(matchModel);
  
          const response = await matchService.update(fakeId,fakeScore);
          expect(response.code).to.be.eq(200);
          expect(response.newMatch).to.be.eq(fakeUpdatedScore)
        });
      });
      describe('Em caso de falha', () => {
        
        it('Retorna um objeto com a chave message em caso de partida não encontrada ou já finalizada e uma chave code: 404', async () => {
          const matchModel: IModelMatch<Matches> = {
              findAll: sinon.stub().resolves(),
              create: sinon.stub().resolves(),
              update: sinon.stub().resolves(null),
            };
            const matchService = new MatchService(matchModel);
            const ERROR_MESSAGE = 'That match is not in progress anymore or the match does not exist';
            const response = await matchService.update(fakeId, null);
            expect(response.message).to.be.eq(ERROR_MESSAGE);
            expect(response.code).to.be.eq(404);
          });
        });
      });
    });

