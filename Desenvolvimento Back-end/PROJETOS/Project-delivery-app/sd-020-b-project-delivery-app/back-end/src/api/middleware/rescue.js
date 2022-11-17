module.exports = (action) => async (req, res, next) => {
    try {
        await action(req, res, next);
    } catch (err) {
        next(err);
    }
};