const {Book} = require('../models/')

const getAll = async () => {
    const books = await Book.findAll({
        order: [['title']],
    });
    return {code:200, result:books};
};

const getById = async (id) => {
    const book = await Book.findByPk(id);
    if(!book) return {error: {code:404, message: 'Book not found'}}
    return {code:200, result:book};
};

const create = async (data) => {
    const book = await Book.create(data);
    return { code:201, result:book };
}

const update = async (id,data) => {
    // const [updatedBook] = await Book.update(data, {where:{id}});
    // if(!updatedBook) return {error: {code:404, message: 'Book not found'}}
    // return {code:201, message: 'Book updated'};
    const {error} = await Book.getById(id);
    if(error) return error;
    await Book.update(data,{where: {id}});
    return {code:201, message: 'Book updated'};

}

const remove = async (id) => {
    const removed = await Book.destroy({where:{id}});
    if (!removed) return {error: {code:500, message: 'Algo deu errado'}};
    return {code:200, message: 'Book removed'}
}

const getByAuthor = async (author) => {
    const bookByAuthor = await Book.findAll({
        where:{author},
        order: [['title']],
    });
    return {code:200, result:bookByAuthor};
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getByAuthor,
};