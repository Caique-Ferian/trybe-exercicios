import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export default class MotorcyclesController {
  constructor(private _service: IService<IMotorcycle>) {
  }

  public async create(req: Request, res: Response) {
    const { code, documents } = await this._service.create(req.body);
    return res.status(code).json(documents);
  }

  public async read(_req: Request, res: Response) {
    const { code, documents } = await this._service.read();
    return res.status(code).json(documents);
  }

  public async readOne(req: Request, res: Response) {
    const { code, documents } = await this._service.readOne(req.params.id);
    return res.status(code).json(documents);
  }
  
  public async update(req: Request, res: Response) {
    const { code, documents } = await this._service.update(req.params.id, req.body);
    return res.status(code).json(documents);
  }

  public async delete(req: Request, res: Response) {
    const { code } = await this._service.delete(req.params.id);
    return res.status(code).end();
  }
}