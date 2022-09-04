const validateBody = require('./utils/validateBody');
const userServices = require('../services/userServices');

module.exports = async (req,res,next) => {
    const {error} = validateBody(req.body);
    if(error) return next(error);
    const {username, password} = req.body;
    const {err, token} = await userServices.login({username, password});
    if (err) return next(err);
    return res.status(200).json({token});
};