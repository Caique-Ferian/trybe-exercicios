import Joi from 'joi';
import { User, Product, Order } from '../interfaces/trybesmith.interface';

export const validateLogin = (body: User) => Joi.object({
  username: Joi.string().required().messages({ 'string.empty': '"username" is required' }),
  password: Joi.string().required().messages({ 'string.empty': '"password" is required' }),
}).validate(body);

export const validateProduct = (body: Product) => Joi.object({
  name: Joi.string().min(3).required().messages({ 
    'string.empty': '"name" is required',
    'string.base': '"name" must be a string',
    'string.min': '"name" length must be at least 3 characters long',
  }),
  amount: Joi.string().min(3).required().messages({ 
    'string.empty': '"amount" is required',
    'string.base': '"amount" must be a string',
    'string.min': '"amount" length must be at least 3 characters long',
  }),
}).validate(body);

export const validateUser = (body: Product) => Joi.object({
  username: Joi.string().min(3).required().messages({ 
    'string.empty': '"username" is required',
    'string.base': '"username" must be a string',
    'string.min': '"username" length must be at least 3 characters long',
  }),
  classe: Joi.string().min(3).required().messages({ 'string.empty': '"classe" is required',
    'string.base': '"classe" must be a string',
    'string.min': '"classe" length must be at least 3 characters long',
  }),
  level: Joi.number().min(1).required().messages({ 'number.empty': '"level" is required',
    'number.base': '"level" must be a number',
    'number.min': '"level" must be greater than or equal to 1',
  }),
  password: Joi.string().min(8).required().messages({ 'string.empty': '"password" is required',
    'string.base': '"password" must be a string',
    'string.min': '"password" length must be at least 8 characters long',
  }),
}).validate(body);

export const validateOrder = (body: Order) => Joi.object({
  productsIds: Joi.array().min(1).items(Joi.number()).required()
    .messages({ 
      'array.empty': '"productsIds" is required',
      'array.base': '"productsIds" must be an array',
      'array.items': '"productsIds" must include only numbers',
      'array.min': '"productsIds" must include only numbers',
    }),
}).validate(body);