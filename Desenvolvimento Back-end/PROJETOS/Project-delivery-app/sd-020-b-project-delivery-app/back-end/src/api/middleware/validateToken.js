const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const JWT_SECRET_PATH = path.join(__dirname, '../../..', 'jwt.evaluation.key');
const JWT_SECRET = fs.readFileSync(JWT_SECRET_PATH, 'utf8');

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next({ code: 'Unauthorized', message: 'invalid token' });
  }
  try {
    req.userData = jwt.verify(authorization, JWT_SECRET);
    next();
  } catch (error) {
    next({ code: 'Unauthorized', message: 'invalid token' });
  }
};

const validateTokenAdmin = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
      const error = {
          code: 'Unauthorized',
          message: 'Token not found',
      };
      return next(error);
  }
  try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.role === 'administrator') return next();
      throw new Error('Invalid Token');
  } catch (err) {
      err.code = 'Unauthorized';
      return next(err);
  }
};

const validateTokenSeller = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
      const error = {
          code: 'Unauthorized',
          message: 'Token not found',
      };
      return next(error);
  }
  try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.role === 'seller') return next();
      throw new Error('Invalid Token');
  } catch (err) {
      err.code = 'Unauthorized';
      return next(err);
  }
};

module.exports = { validateToken, validateTokenAdmin, validateTokenSeller };
