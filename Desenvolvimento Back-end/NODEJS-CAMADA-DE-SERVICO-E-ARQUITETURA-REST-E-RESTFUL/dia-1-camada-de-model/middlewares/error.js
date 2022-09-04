module.exports = (err,_req,res,_next) => {
    if(err.status) {
        return res.status(err.status).json({message: err.message});
    }
    if (err.isJoi) {
        return res.status(400).json({message: err.details[0].message});
    }
    console.log(err);
    res.status(500).json({message: 'Erro interno do servidor'});
}