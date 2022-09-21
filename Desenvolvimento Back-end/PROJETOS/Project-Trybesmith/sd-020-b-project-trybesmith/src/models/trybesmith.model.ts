import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Product, User, Order } from '../interfaces/trybesmith.interface';

export default class TrybesmithModel {
  public connection: Pool;
  
  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAllProducts(): Promise<Product[]> {
    const query = 'SELECT * FROM Trybesmith.Products';
    const [products] = await this.connection.execute<RowDataPacket[]>(query);
    return products as Product[];
  }

  public async createProduct(product:Product): Promise<Product> {
    const { name, amount } = product;
    const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(query, [name, amount]);
    return { id: insertId, ...product };
  }

  public async createUser(user:User): Promise<User> {
    const { username, classe, level, password } = user;
    const query = `INSERT INTO Trybesmith
    .Users (username, classe, level, password) VALUES (?, ?, ?, ?)`;
    const [{ insertId }] = await this.connection
      .execute<ResultSetHeader>(query, [username, classe, level, password]);
    return { id: insertId, ...user };
  }

  public async getAllOrders(): Promise<Order[]> {
    const query = `SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) AS productsIds FROM Trybesmith
    .Orders AS o INNER JOIN Trybesmith.Products AS p ON p.orderId = o.id
    GROUP BY o.id ORDER BY o.userId`;
    const [orders] = await this.connection.execute<RowDataPacket[]>(query);
    return orders as Order[];
  }

  public async createOrder(userId: number, orders: Array<number>): Promise<Order> {
    const queryOrder = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(queryOrder, [userId]);
    const queryUpdateProduct = 'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?';
    Promise.all(orders.map((productId) => this.connection
      .execute(queryUpdateProduct, [insertId, productId])));
    return { userId, productsIds: orders };
  }

  public async login(user: User): Promise<User[]> {
    const { username, password } = user;
    const query = 'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?';
    const [findUser] = await this.connection.execute<RowDataPacket[]>(query, [username, password]);
    if (findUser.length === 0) return [{ message: 'Username or password invalid' }];
    return findUser as User[];
  }
}