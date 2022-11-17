import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

enum ErrorTypes {
  entityNotFound = 'entityNotFound',
  invalidMongoId = 'invalidMongoId',
}

type ErrorResponseObject = {
  code: number,
  error: string,
};

type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

const errorCatalog: ErrorCatalog = {
  entityNotFound: {
    code: 404,
    error: 'Object not found',
  },
  invalidMongoId: {
    code: 400,
    error: 'Id must have 24 hexadecimal characters',
  },
};

const errorHandler: ErrorRequestHandler = (
  err: ZodError | Error,
  _req: Request,
  res: Response, 
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }
  const keyError = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[keyError];
  if (mappedError) {
    const { code, error } = mappedError;
    return res.status(code).json({ error });
  } 
  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;