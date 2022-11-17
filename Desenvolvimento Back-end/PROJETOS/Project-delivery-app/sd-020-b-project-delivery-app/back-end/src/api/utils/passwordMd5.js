const md5 = require('md5');

const generateHash = (password) => {
  const hash = md5(password);
  return hash;
};

module.exports = { generateHash };