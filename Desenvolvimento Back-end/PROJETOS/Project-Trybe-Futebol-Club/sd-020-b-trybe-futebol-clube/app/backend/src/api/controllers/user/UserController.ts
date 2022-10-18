import { Request, Response } from 'express';
import IServiceUser from '../../../interfaces/userInterface/IServiceUser';
import IRequest from '../../../interfaces/userInterface/IRequest';

export default class UserController {
  constructor(private userService: IServiceUser) { }

  public async login(req: Request, res: Response) {
    const { code, message, token } = await this.userService.login(req.body);
    if (message) return res.status(code).json({ message });
    req.headers.authorization = token;
    return res.status(code).json({ token });
  }

  public static validate(req: IRequest, res: Response) {
    const { role } = req;
    return res.status(200).json({ role });
  }
}
