module.exports = (err,_req,res,_next) => {
    if(err.code) {
        return res.status(err.code).json({message: err.message});
    }
    console.log(err);
    return res.status(500).json({
        error: {
          message: `Internal server error: ${err.message}`,
        },
      });
};