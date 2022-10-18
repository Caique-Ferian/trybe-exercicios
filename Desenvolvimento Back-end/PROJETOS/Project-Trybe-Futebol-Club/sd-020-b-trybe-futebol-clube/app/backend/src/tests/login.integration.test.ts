import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Users from '../database/models/UserModel';
import * as jwt from 'jsonwebtoken';
import { fakeUser, fakeLogin } from '../api/utils/loginConsts'

chai.use(chaiHttp);

const { expect } = chai;

const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc';

describe('Testando /login', () => {
  let chaiHttpResponse: Response;
  beforeEach(sinon.restore);
  describe('rota POST', () => {

    it('Retorna status 200 e um token JWT', async () => {
      sinon.stub(Users, 'findOne').resolves(fakeUser as Users)
      chaiHttpResponse = await chai
    .request(app).post('/login').send(fakeLogin);
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body.token).to.be.exist;
  });
  
  it('Retorna status 404 em caso de falha e uma mensagem de erro', async () => {
    const ERROR_MESSAGE = 'Incorrect email or password';
    chaiHttpResponse = await chai
    .request(app).post('/login').send({email: 'test@test.com', password: '123456'});
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body.message).to.be.eq(ERROR_MESSAGE);
  });
})
describe('rota GET', () => {

  it('Retorna status 200 e a role do usuário conectado', async () => {
    sinon.stub(jwt,'verify').callsFake(() => ({ role: 'admin' }));
    chaiHttpResponse = await chai
  .request(app).get('/login/validate').set('authorization',fakeToken);
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.have.key('role');
    expect(chaiHttpResponse.body.role).to.be.eq('admin');
  });

})
});
