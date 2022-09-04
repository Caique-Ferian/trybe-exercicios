const userServices = require('../services/userServices');
const validateBody = require('./utils/validateBody');

module.exports = async (req,res,next) => {
    const {error} = validateBody(req.body);
    if(error) return next(error);
    const {username,password} = req.body;
    const result = await userServices.create({username,password});
    if(result.error) return next(result.error);
    return res.status(201).json({token: result.token})

};
 