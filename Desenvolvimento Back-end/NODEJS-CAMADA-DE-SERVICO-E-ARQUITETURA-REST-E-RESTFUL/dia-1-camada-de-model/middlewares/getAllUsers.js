const rescue = require('./rescue');
const {getAllUsers} = require('../models/User');

module.exports = rescue(async(_req,res) => {
    const allUsers = await getAllUsers();
    res.status(200).json(allUsers)
});