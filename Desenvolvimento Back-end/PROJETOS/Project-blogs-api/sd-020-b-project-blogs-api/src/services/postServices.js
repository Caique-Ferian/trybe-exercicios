const Joi = require('joi');
const Sequelize = require('sequelize');

const { Op } = Sequelize;
const { Category, BlogPost, PostCategory, User } = require('../database/models');

const ERROR_MESSAGE = 'Some required fields are missing';
const validateBody = (body) => Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        categoryIds: Joi.array().min(1).required(),
    }).validate(body);

const findCategoryToValidate = async (array) => {
    const answer = Promise.all(array.map((e) => {
        const findByPk = Category.findByPk(e);
        return findByPk;
    })).then((result) => result.find((e) => e === null));
    return answer;
};

const create = async (body) => {
    const { error } = validateBody(body);
    if (error) {
        error.code = 'invalidData';
        error.details[0].message = ERROR_MESSAGE;
        return { error }; 
    }
    const { title, content, categoryIds } = body;
    const findCategory = await findCategoryToValidate(categoryIds);
    if (findCategory === null) { 
        return { error: { code: 'invalidData', message: '"categoryIds" not found' } }; 
    } 
    const newPost = await BlogPost.create({ title, content });
    await Promise
        .all(categoryIds.map((e) => PostCategory.create({
             postId: newPost.id, categoryId: e })));
    return { code: 201, newPost };
};

const getAll = async (queryId = null) => {
    const postsIds = queryId || await BlogPost.findAll();
    const posts = await Promise.all(postsIds.map(({ id }) => BlogPost.findOne({ include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
    }, { where: { id }, model: Category, as: 'categories', through: { attributes: [] } }],
})));
    return { code: 200, posts };
};

const getById = async (id) => {
    const validateId = await BlogPost.findByPk(id);
    if (!validateId) {
        return { error: { code: 'notFound', message: 'Post does not exist' } };
    }
    const post = await BlogPost.findOne({ include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
    }, { where: { id }, model: Category, as: 'categories', through: { attributes: [] } }],
});
    return { code: 200, post };
};

const update = async (id, userId, { title, content }) => {
    if (!title || !content) {
        return { error: { code: 'invalidData', message: ERROR_MESSAGE } }; 
    }
    const findPost = await BlogPost.findByPk(id);
    if (!findPost) {
        return { error: { code: 'notFound', message: 'Post does not exist' } };
    }
    if (findPost.userId !== userId) {
        return { error: { code: 'Unauthorized', message: 'Unauthorized user' } };
    }
    await BlogPost.update({ title, content }, { where: { id } });
    const { post: updatedPost } = await getById(id);
    return { code: 200, updatedPost };
};

const destroy = async (id, userId) => {
    const findPost = await BlogPost.findByPk(id);
    if (!findPost) {
        return { error: { code: 'notFound', message: 'Post does not exist' } };
    }
    if (findPost.userId !== userId) {
        return { error: { code: 'Unauthorized', message: 'Unauthorized user' } };
    }
    await BlogPost.destroy({ where: { id } });
    return { code: 204 };
};

const getByQuery = async (query) => {
    if (!query) {
        const posts = await getAll();
        return posts;
    }
    const queryTitle = await BlogPost.findAll({ where: { title: { [Op.like]: `%${query}%` } } });
    const queryContent = await BlogPost.findAll({ where:
        { content: { [Op.like]: `%${query}%` } } });
    const { posts } = await getAll(queryTitle.length ? queryTitle : queryContent);
    return { code: 200, posts };
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    destroy,
    getByQuery,
};
