module.exports = (err, _req, res, _next) => {
    const { code, message } = err;
    const statusError = {
        notFound: 404,
        alreadyExists: 409,
        internalError: 500,
        Unauthorized: 401,
    };
    if (code) {
        return res.status(statusError[code]).json({ message });
    } 
    console.log(err);
    return res.status(statusError.internalError).json({ message: 'Internal server error' });
};