const BookService = require('../services/BooksService');

const getAll = async (req,res) => {
    const {author} = req.query;
    const {code,result} = author ? await BookService.getByAuthor(author) : await BookService.getAll();
    res.status(code).json(result);
};

const getById = async (req,res,next) => {
    const {id} = req.params;
    const {error,result,code} = await BookService.getById(id);
    if(error) return next(error);
    res.status(code).json(result);
}

const create = async (req,res) => {
    const {title,author,pageQuantity, publisher} = req.body;
    const {code,result} = await BookService.create({title,author,pageQuantity,publisher});
    res.status(code).json(result);
}

const update = async (req,res,next) => {
    const {id} = req.params;
    const {title,author,pageQuantity,publisher} = req.body;
    const {error,code,message} = await BookService.update(id,{title,author,pageQuantity,publisher});
    if(error) return next(error);
    res.status(code).json({message});
}

const remove = async (req,res,next) => {
    const {id} = req.params;
    const {error,code,message} = await BookService.remove(id);
    if(error) return next(error);
    res.status(code).json({message});
 
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};