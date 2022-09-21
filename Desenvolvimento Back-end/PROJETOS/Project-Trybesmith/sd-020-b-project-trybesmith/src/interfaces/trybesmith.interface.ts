import { ValidationError } from 'joi';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

export interface Product {
  id?:number,
  name?: string,
  amount?: string,
  error?: Error,
  message?: string,
}

export interface User {
  token?:string,
  id?:number,
  username?:string;
  classe?:string;
  level?:number,
  password?:string,
  message?:string,
}
export interface Token extends User {
  token?:string,
  error?: Error,
  user?: string | jwt.JwtPayload,
}
export interface TokenGeneration extends User {
  token:string,
  error?: Error,
}
export interface Order {
  id?:number,
  userId?:number,
  productsIds?: Array<number>,
  error?: Error,
  message?: string
}
export interface Error extends ValidationError{
  message: string,
}
export interface RequestToken extends Request {
  user?: jwt.JwtPayload | User,
}

// export interface JwtPayload extends jwt.JwtPayload {
//   user: JwtPayload;
// }