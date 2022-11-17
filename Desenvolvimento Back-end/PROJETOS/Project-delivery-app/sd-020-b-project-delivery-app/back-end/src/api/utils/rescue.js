const CustomError = require('./CustomError');

const rescue = (service) => async (req, res, next) => {
  try {
    const response = await service(req, res, next);
    return response;
  } catch (err) {
    if (err instanceof CustomError) {
      next({ code: err.code, message: err.message });
    } else {
      next({ code: 500, message: err.message });
    }
  }
};  

module.exports = rescue;
