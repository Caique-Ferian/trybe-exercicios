import { sign } from 'jsonwebtoken';
import { User } from '../interfaces/trybesmith.interface';

const createJWT = (payload:User): string => {
  const token = sign(payload, 'meuSecretToken', { expiresIn: '1h' });
  return token;
};

export default createJWT;