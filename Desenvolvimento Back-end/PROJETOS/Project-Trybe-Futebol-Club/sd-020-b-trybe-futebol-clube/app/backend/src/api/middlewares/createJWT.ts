import 'dotenv/config';
import { sign } from 'jsonwebtoken';
import IUser from '../../interfaces/userInterface/IUser';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const createJwt = (payload:IUser): string => {
  const token = sign(payload, JWT_SECRET, { expiresIn: '1h' });
  return token;
};

export default createJwt;
