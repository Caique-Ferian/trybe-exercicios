import { Request, Response } from 'express';
import TrybesmithService from '../services/trybesmith.service';
import { Product, User, Token, Order, RequestToken } from '../interfaces/trybesmith.interface';

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
const UNAUTHORIZED_STATUS = 401;
const UNPROCESSABLE_STATUS = 422;
export default class TrybesmithController {
  private service : TrybesmithService;

  constructor() {
    this.service = new TrybesmithService();
  }

  public getAllProducts = async (_req: Request, res: Response<Product[]>) => {
    const products = await this.service.getAllProducts();
    return res.status(OK_STATUS).json(products);
  };

  public createProduct = async (
    req: Request<unknown, unknown, Product>,
    res: Response<Product>,
  ) => {
    const product = req.body;
    const newProduct = await this.service.createProduct(product);
    if (newProduct.error) {
      const { details } = newProduct.error;
      if (details[0].message.includes('required')) {
        return res.status(BAD_REQUEST_STATUS).json({ message: details[0].message });
      }
      return res.status(UNPROCESSABLE_STATUS).json({ message: details[0].message });
    }
    return res.status(CREATED_STATUS).json(newProduct);
  };

  public createUser = async (
    req: Request<unknown, unknown, User>,
    res: Response<Token>,
  ) => {
    const user = req.body;
    const { error, token } = await this.service.createUser(user);
    if (error) {
      if (error.details[0].message.includes('required')) {
        return res.status(BAD_REQUEST_STATUS).json({ message: error.details[0].message });
      }
      return res.status(UNPROCESSABLE_STATUS).json({ message: error.details[0].message });
    }
    req.headers.authorization = token;
    return res.status(CREATED_STATUS).json({ token });
  };

  public getAllOrders = async (_req: Request, res: Response<Order[]>) => {
    const orders = await this.service.getAllOrders();
    return res.status(OK_STATUS).json(orders);
  };

  public createOrder = async (
    req: RequestToken,
    res: Response<Order>,
  ) => {
    const order = req.body;
    const { user } = req;
    const { error, userId, productsIds } = await this.service
      .createOrder(user?.id, order.productsIds);
    if (error) {
      if (error.details[0].message.includes('required')) {
        return res.status(BAD_REQUEST_STATUS).json({ message: error.details[0].message });
      }
      return res.status(UNPROCESSABLE_STATUS).json({ message: error.details[0].message });
    }
    return res.status(CREATED_STATUS).json({ userId, productsIds });
  };

  public login = async (
    req: Request<unknown, unknown, User>,
    res: Response<Token>,
  ) => {
    const login = req.body;
    const { token, error, message } = await this.service.login(login);
    if (error) return res.status(BAD_REQUEST_STATUS).json({ message: error.details[0].message });
    if (message) return res.status(UNAUTHORIZED_STATUS).json({ message });
    req.headers.authorization = token;
    return res.status(OK_STATUS).json({ token });
  };
}