module.exports = (err,_req,res,_next) => {
    if(err.isJoi) {
        return res.status(400).json({message: err.details[0].message});
    }
    const {error} = err;
    if(error.code) {
        const statusError = {
            notFound: 404,
            invalidData: 400,
            alreadyExists:409,
        };
        return res.status(statusError[error.code]).json({message:error.message})
    }
    console.log(err);
    return res.status(500).json({ error: { code: 'internal', message: 'Internal server error' } });

};