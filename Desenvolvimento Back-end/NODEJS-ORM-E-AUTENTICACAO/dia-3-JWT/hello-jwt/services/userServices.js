const userModels = require('../models/userModels');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const generateToken = (username,admin) => {
    const payload = {username, admin};
    const token = jwt.sign(payload,JWT_SECRET, {
        expiresIn:'1h',
    });
    return token;
}

const create = async ({username,password}) => {
    const exist = await userModels.getOne(username);
    if (exist) {
        return {
            error: { 
                message: "user already exists",
                statusCode: 409,
            }
        }
    }
    const admin = Math.floor(Math.random() * 100) > 50;
    await userModels.create({username,password,admin});
    const token = generateToken(username, admin);
    return {token};
};

const login = async ({username,password}) => {
    const user = await userModels.getOne(username);
    if(!user || user.password !== password) {
        const err = new Error('Invalid username or password');
        err.statusCode = 401;
        return { err };
    }
    const token = generateToken(username,user.admin);
    return {token};
    
}   

module.exports = {
    create,
    login,
};