import { verify } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { RequestToken } from '../interfaces/trybesmith.interface';

const validateJWT = (req: RequestToken, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const decoded = verify(token, 'meuSecretToken');
    if (typeof decoded !== 'string') {
      req.user = decoded;
    }
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}; 

export default validateJWT;