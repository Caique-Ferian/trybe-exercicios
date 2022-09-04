const rescue = require('./rescue');
const {getUserById} = require('../models/User');

module.exports = rescue(async(req,res) => {
    const {id} = req.params
    const user = await getUserById(id);
    if(!user) return res.status(404).json({message:'Not Found'});
    return res.status(200).json(user)
});