module.exports = (req, res, next) => {
    try{
        const { authorizations } = req.headers;
        if(!authorizations || authorizations.length < 16) {
            return res.status(401).json({message:'Token inválido!'});
        }
        return next();
    } catch(e){
        return res.status(500).end();
    }

}