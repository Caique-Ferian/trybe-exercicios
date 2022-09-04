const loginService = require('../services/loginServices');

module.exports = async (req, res, next) => {
    const { email, password } = req.body;
    const { error, code, token } = await loginService({ email, password });
    if (error) return next(error);
    req.headers.authorization = token;
    return res.status(code).json({ token });
};