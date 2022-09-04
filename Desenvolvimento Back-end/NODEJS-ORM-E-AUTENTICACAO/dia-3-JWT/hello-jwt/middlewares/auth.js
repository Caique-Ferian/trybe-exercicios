const jwt = require('jsonwebtoken');

const {JWT_SECRET} = process.env;

module.exports = (req,res,next) => {
    const {authorization} = req.headers;
    if(!authorization) {
        const error = new Error('Token not found');
        error.statusCode = 401;
        next(error);
    }
    try{
        const payload = jwt.verify(authorization, JWT_SECRET);
        req.user = payload;
        return next();
    }catch(err) {
        err.statusCode = 401;
        return next(err);
    }

};