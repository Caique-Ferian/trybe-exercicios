import connection from '../models/connection';
import TrybesmithModel from '../models/trybesmith.model';
import { Product, User, TokenGeneration,
  Order } from '../interfaces/trybesmith.interface';
import createJWT from '../middlewares/createJWT';
import { validateLogin, validateProduct,
  validateUser, validateOrder } from '../middlewares/validateBody';

export default class TrybesmithService {
  public model: TrybesmithModel;

  constructor() {
    this.model = new TrybesmithModel(connection);
  }

  public async getAllProducts(): Promise<Product[]> {
    return this.model.getAllProducts();
  }
  
  public async createProduct(product: Product): Promise<Product> {
    const { error } = validateProduct(product);
    if (error) return { error };
    return this.model.createProduct(product);
  }
  
  public async createUser(user: User): Promise<TokenGeneration> {
    const { error } = validateUser(user);
    if (error) return { error, token: 'none' };
    const payload = await this.model.createUser(user);
    const token = createJWT(payload);
    return { token };
  }

  public async getAllOrders(): Promise<Order[]> {
    return this.model.getAllOrders();
  }

  public async createOrder(userId: number, orders: Array<number>): Promise<Order> {
    const { error } = validateOrder({ productsIds: orders });
    if (error) return { error };
    return this.model.createOrder(userId, orders);
  }

  public async login(user: User): Promise<TokenGeneration> {
    const { error } = validateLogin(user);
    if (error) return { error, token: 'none' };
    const findUser = await this.model.login(user);
    if (Object.keys(findUser[0]).includes('message')) return { ...findUser[0] } as TokenGeneration;
    const token = createJWT({ ...findUser[0] });
    return { token };
  }
}