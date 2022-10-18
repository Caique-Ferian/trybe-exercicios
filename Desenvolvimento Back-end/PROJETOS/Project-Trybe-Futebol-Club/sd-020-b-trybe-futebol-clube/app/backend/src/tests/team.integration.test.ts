import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Teams from '../database/models/TeamModel';
import fakeTeams from '../api/utils/teamConsts'
chai.use(chaiHttp);

const { expect } = chai;


describe('Testando /teams', () => {
  let chaiHttpResponse: Response;
  beforeEach(sinon.restore);
  describe('rota GET', () => {

    it('Retorna status 200 e um array de objetos', async () => {
      sinon.stub(Teams, 'findAll').resolves(fakeTeams as Teams[])
      chaiHttpResponse = await chai
    .request(app).get('/teams');
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.exist;
    expect(chaiHttpResponse.body).to.be.have.length(3);

  });
  
  it('Retorna status 200 e o objeto referente ao Id do time', async () => {
    chaiHttpResponse = await chai
    .request(app).get('/teams/1');
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body.id).to.be.eq(fakeTeams[0].id);
    expect(chaiHttpResponse.body.teamName).to.be.eq(fakeTeams[0].teamName);
  });
})
});
