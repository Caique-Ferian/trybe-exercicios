import IModelUser from '../../../interfaces/userInterface/IModelUser';
import Users from '../../../database/models/UserModel';
import ILogin from '../../../interfaces/userInterface/ILogin';

export default class UserModel implements IModelUser<Users> {
  constructor(private userModel: typeof Users) { }
  public async findOne(user: ILogin): Promise<Users | null> {
    const { email } = user;
    return this.userModel.findOne({ where: { email } });
  }
}
