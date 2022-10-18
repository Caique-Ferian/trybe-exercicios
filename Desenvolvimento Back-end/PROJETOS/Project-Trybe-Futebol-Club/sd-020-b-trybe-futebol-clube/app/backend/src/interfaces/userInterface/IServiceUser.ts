import ILogin from './ILogin';
import IToken from './IToken';

export default interface IServiceUser {
  login(user: ILogin): Promise<IToken>
}
