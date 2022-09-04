module.exports = (req, res, next) => {
    const {infos:{warrantyPeriod}} = req.body;
    if(warrantyPeriod === undefined) return res.status(400).json(
        { "message": "O campo warrantyPeriod é obrigatório"},
        );
    if(warrantyPeriod < 1 || warrantyPeriod > 3) return res.status(400).json(
        { "message": "O campo warrantyPeriod precisa estar entre 1 e 3"},
        ); 
    next();
};