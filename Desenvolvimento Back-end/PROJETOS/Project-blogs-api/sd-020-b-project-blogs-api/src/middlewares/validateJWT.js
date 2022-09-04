const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (req, _res, next) => {
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
        req.user = decoded;
        return next();
    } catch (err) {
        err.code = 'Unauthorized';
        err.message = 'Expired or invalid token';
        return next(err);
    }
};