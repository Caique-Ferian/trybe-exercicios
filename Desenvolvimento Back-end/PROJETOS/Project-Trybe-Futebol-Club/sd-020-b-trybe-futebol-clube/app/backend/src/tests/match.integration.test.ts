import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Matches from '../database/models/MatchModel';
import Teams from '../database/models/TeamModel'
import { IMatch } from '../interfaces/matchInterface/IServiceMatch';
import * as jwt from 'jsonwebtoken';
import { fakeMatches, fakeMatchToCreate, fakeUpdatedScore, fakeScore } from '../api/utils/matchConsts'
chai.use(chaiHttp);

const { expect } = chai;

const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc';

describe('Testando /matches', () => {
  let chaiHttpResponse: Response;
  beforeEach(sinon.restore);
  describe('rota GET', () => {

    it('Retorna status 200 e um array de objetos sem query informada', async () => {
      sinon.stub(Matches, 'findAll').resolves(fakeMatches as IMatch[])
      chaiHttpResponse = await chai
    .request(app).get('/matches');
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.exist;
    expect(chaiHttpResponse.body).to.be.have.length(3);

  });
  
  it('Retorna status 200 e um array de objetos com query = false', async () => {
    sinon.stub(Matches, 'findAll').resolves(fakeMatches.filter((e) => e.inProgress === false) as IMatch[])
    chaiHttpResponse = await chai
    .request(app).get('/matches').set('query', 'false');
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.exist;
    expect(chaiHttpResponse.body).to.be.have.length(2);
  });

  it('Retorna status 200 e um array de objetos com query = true', async () => {
    sinon.stub(Matches, 'findAll').resolves(fakeMatches.filter((e) => e.inProgress === true) as IMatch[])
    chaiHttpResponse = await chai
    .request(app).get('/matches').set('query', 'true');
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.exist;
    expect(chaiHttpResponse.body).to.be.have.length(1);
  });

  describe('rota POST', () => {
    const {homeTeam,homeTeamGoals,awayTeam,awayTeamGoals,inProgress} = fakeMatchToCreate;

    it('Retorna status 201 e a partida criada', async () => {
      sinon.stub(jwt,'verify').callsFake(() => ({ role: 'admin' }));
      chaiHttpResponse = await chai
    .request(app).post('/matches').send({homeTeam,homeTeamGoals,awayTeam,awayTeamGoals,inProgress}).set('authorization',fakeToken);
      expect(chaiHttpResponse.status).to.be.eq(201);
      expect(chaiHttpResponse.body).to.have.keys('id','homeTeam','homeTeamGoals','awayTeam','awayTeamGoals','inProgress');
    });

    it('Retorna status 401 e uma mensagem de erro se homeTeam = awayTeam', async () => {
      sinon.stub(jwt,'verify').callsFake(() => ({ role: 'admin' }));
      chaiHttpResponse = await chai
    .request(app).post('/matches').send({homeTeam:8,homeTeamGoals,awayTeam:8,awayTeamGoals,inProgress}).set('authorization',fakeToken);
      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body).to.have.key('message');
    });
  
    it('Retorna status 401 e uma mensagem de erro se token inválido', async () => {
      chaiHttpResponse = await chai
    .request(app).post('/matches').send({homeTeam,homeTeamGoals,awayTeam,awayTeamGoals,inProgress}).set('authorization',fakeToken);
      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body).to.have.key('message');
      expect(chaiHttpResponse.body.message).to.be.eq('Token must be a valid token');
    });

    it('Retorna status 404 e uma mensagem de erro se algum time não existir no banco de dados', async () => {
      sinon.stub(jwt,'verify').callsFake(() => ({ role: 'admin' }));
      sinon.stub(Teams,'findByPk').resolves(null);
      chaiHttpResponse = await chai
    .request(app).post('/matches').send({homeTeam:30,homeTeamGoals,awayTeam:8,awayTeamGoals,inProgress}).set('authorization',fakeToken);
      expect(chaiHttpResponse.status).to.be.eq(404);
      expect(chaiHttpResponse.body).to.have.key('message');
    });
  });

  describe('rota PATCH', () => {

    describe('Atualizando chave inProgress', () => {

      it('Retorna status 200 e uma mensagem', async () => {
        sinon.stub(Matches, 'findByPk').resolves(fakeMatches[2] as IMatch);
        chaiHttpResponse = await chai
        .request(app).patch('/matches/1/finish');
        expect(chaiHttpResponse.status).to.be.eq(200);
        expect(chaiHttpResponse.body).to.have.key('message');
      });
    })

    it('Retorna status 200 e a partida atualizada', async () => {
      sinon.stub(Matches, 'findByPk').resolves(fakeUpdatedScore as IMatch);
      chaiHttpResponse = await chai
    .request(app).patch('/matches/1').send(fakeScore);
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.have.keys('id','awayTeam','awayTeamGoals','homeTeam','homeTeamGoals','inProgress');
    });
  
    it('Retorna status 404 e uma mensagem de erro se id inválido', async () => {
      sinon.stub(Matches, 'findByPk').resolves(null);
      chaiHttpResponse = await chai
    .request(app).patch('/matches/1').send(fakeScore);
      expect(chaiHttpResponse.status).to.be.eq(404);
      expect(chaiHttpResponse.body).to.have.key('message');
    });
  });
});
});
