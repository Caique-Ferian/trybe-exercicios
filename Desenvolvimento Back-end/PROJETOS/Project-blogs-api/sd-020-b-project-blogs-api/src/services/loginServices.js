const { User } = require('../database/models');
const { createJWT } = require('../middlewares');

module.exports = async ({ email, password }) => {
    if (!email || !password) { 
        return { 
            error: { code: 'invalidData', message: 'Some required fields are missing' },
        };
    }
    const login = await User.findOne({ where: { email, password } });
    if (!login) { 
        return { 
            error: { code: 'invalidData', message: 'Invalid fields' },
        };
    }
    const { id, displayName, image } = login.dataValues;
    const payload = { id, displayName, email, image };
    const token = createJWT(payload);
    return { code: 200, token };
};