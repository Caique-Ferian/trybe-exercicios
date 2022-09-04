module.exports = (req,res,next) => {
    const {admin} = req.user;
    if(!admin) {
        const error = new Error('Restricted access');
        error.statusCode = 403;
        return next(error);
    }
    next();
}