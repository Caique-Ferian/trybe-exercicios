const postService = require('../services/postServices');

const create = async (req, res, next) => {
    const { error, code, newPost } = await postService.create(req.body);
    if (error) return next(error);
    newPost.userId = req.user.id;
    return res.status(code).json(newPost);
};

const getAll = async (_req, res) => {
    const { code, posts } = await postService.getAll();
    return res.status(code).json(posts);
};

const getById = async (req, res, next) => {
    const { id } = req.params;
    const { error, code, post } = await postService.getById(id);
    if (error) next(error);
    return res.status(code).json(post);
};

const update = async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const { error, code, updatedPost } = await postService
    .update(id, req.user.id, { title, content });
    if (error) next(error);
    return res.status(code).json(updatedPost);
};

const destroy = async (req, res, next) => {
    const { id } = req.params;
    const { error, code } = await postService.destroy(id, req.user.id);
    if (error) next(error);
    return res.status(code).end();
};

const getByQuery = async (req, res) => {
    const { q } = req.query;
    const { code, posts } = await postService.getByQuery(q);
    return res.status(code).json(posts);
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    destroy,
    getByQuery,
};