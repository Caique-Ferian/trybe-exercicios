module.exports = (err, _req, res, _next) => {
    const { code, message, isJoi, details } = err;
    const statusError = {
        notFound: 404,
        invalidData: 400,
        alreadyExists: 409,
        internalError: 500,
        Unauthorized: 401,
    };
    if (isJoi) {
        return res.status(statusError[code]).json({ message: details[0].message });
    }
    if (code) {
        return res.status(statusError[code]).json({ message });
    } 
    console.log(err);
    return res.status(statusError.internalError).json({ message: 'Internal server error' });
};