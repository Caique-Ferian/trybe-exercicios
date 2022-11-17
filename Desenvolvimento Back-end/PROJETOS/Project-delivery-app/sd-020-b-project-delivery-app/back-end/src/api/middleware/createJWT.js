const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const JWT_SECRET_PATH = path.join(__dirname, '../../..', 'jwt.evaluation.key');
const JWT_SECRET = fs.readFileSync(JWT_SECRET_PATH, 'utf8');

module.exports = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256' });
  return token;
};
