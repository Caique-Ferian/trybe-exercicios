import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Teams from '../database/models/TeamModel'
import { ITeamsHome, ITeamsAway } from '../interfaces/leaderboardInterface/IServiceLeaderboard';
import { fakeTeamHome, fakeTeamAway } from '../api/utils/leaderboardConsts'
chai.use(chaiHttp);

const { expect } = chai;


describe('Testando /leaderboard', () => {
  let chaiHttpResponse: Response;
  beforeEach(sinon.restore);
  describe('rota GET /home', () => {

    it('Retorna status 200 e um array de objetos', async () => {
      sinon.stub(Teams, 'findAll').resolves(fakeTeamHome as ITeamsHome[])
      chaiHttpResponse = await chai
    .request(app).get('/leaderboard/home');
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.exist;
    expect(chaiHttpResponse.body).to.be.have.length(2);

  });

  describe('rota GET /away', () => {

  it('Retorna status 200 e um array de objetos', async () => {
    sinon.stub(Teams, 'findAll').resolves(fakeTeamAway as ITeamsAway[])
    chaiHttpResponse = await chai
    .request(app).get('/leaderboard/away');
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.exist;
    expect(chaiHttpResponse.body).to.be.have.length(2);
  });
});
  });
});
