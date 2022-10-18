import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import UserService from '../api/services/user/UserService';
import { fakeUser, fakeSuccess, fakeError, fieldError, fakeLogin} from '../api/utils/loginConsts'
import IModelUser from '../interfaces/userInterface/IModelUser';
import Users from '../database/models/UserModel';
const { expect } = chai;


describe('Testando UserService', () => {
  beforeEach(sinon.restore);
  
  describe('Testando Login em caso de sucesso', () => {
    const userModel: IModelUser<Users> = {
      findOne: sinon.stub().resolves(fakeUser)
    }
    const userService = new UserService(userModel);
  
    it('Retorna um token JWT e uma chave code: 200', async () => {
      sinon.stub(userService,'login').resolves(fakeSuccess);
      const response = await userService.login(fakeLogin);
      expect(response.token).to.be.eq(fakeSuccess.token);
      expect(response.code).to.be.eq(fakeSuccess.code);

    });
  });
  describe('Testando Login em caso de falha', () => {
    const userModel: IModelUser<Users> = {
      findOne: sinon.stub().resolves(null)
    }
    const userService = new UserService(userModel);
  
    it('Retorna uma mensagem de erro e uma chave code: 404 em caso de senha incorreta', async () => {
      const response = await userService.login({email: 'test@test.com', password: '123'});
      expect(response.message).to.be.eq(fieldError.message);
      expect(response.code).to.be.eq(fieldError.code);
    });
    it('Retorna uma mensagem de erro e uma chave code: 404 em caso de email incorreto', async () => {
      const response = await userService.login({email: 'test@test', password: '1234567'});
      expect(response.message).to.be.eq(fieldError.message);
      expect(response.code).to.be.eq(fieldError.code);
    });
    it('Retorna uma mensagem de erro e uma chave code: 404 em caso não encontrar usuário', async () => {
      const response = await userService.login(fakeLogin);
      expect(response.message).to.be.eq(fakeError.message);
      expect(response.code).to.be.eq(fakeError.code);
    });
  });
});
