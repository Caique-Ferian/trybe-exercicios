const connection = require('./connection');

const formatUsers = ({id,first_name: firstName, last_name: lastName, email}) => {
    return {
        id,
        firstName,
        lastName,
        email
    }
};

const createUser = async ({firstName,lastName,email,password}) => {
    const query = 'INSERT INTO users (first_name,last_name,email,password) VALUES (?, ?, ?, ?)';
    await connection.execute(query,[firstName,lastName,email,password])
};
const getAllUsers = async () => {
    const query = 'SELECT * FROM users';
    const [users] = await connection.execute(query);
    return users.map(formatUsers);
};

const getUserById = async (id) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [user] = await connection.execute(query,[id]);
    if (user[0]) return formatUsers(user[0]);
    return null;
};

const updateUser = async (id,{firstName,lastName,email,password}) => {
    const query = 'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?';
    await connection.execute(query,[firstName,lastName,email,password, id])
};

module.exports = {createUser, getAllUsers, getUserById, updateUser};