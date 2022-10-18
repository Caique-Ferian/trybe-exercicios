import { compareSync } from 'bcryptjs';
import Users from '../../../database/models/UserModel';
import IModelUser from '../../../interfaces/userInterface/IModelUser';
import IServiceUser from '../../../interfaces/userInterface/IServiceUser';
import ILogin from '../../../interfaces/userInterface/ILogin';
import IToken from '../../../interfaces/userInterface/IToken';
import createJWT from '../../middlewares/createJWT';
import ValidateLogin from '../../utils/validateLogin';

export default class UserService implements IServiceUser {
  constructor(private userModel: IModelUser<Users>) { }

  public async login(user: ILogin) : Promise<IToken> {
    const { email: e, password } = user;
    if (!ValidateLogin.validateFields(e, password)) {
      return { code: 400,
        message: 'All fields must be filled' };
    }
    const hasUser = await this.userModel.findOne(user);
    if (!hasUser || !compareSync(password, hasUser.password)) {
      return { code: 401,
        message: 'Incorrect email or password' };
    }
    const { id, username, role, email } = hasUser;
    const token = createJWT({ id, username, role, email });
    return { code: 200, token };
  }
}
