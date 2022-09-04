const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.join(__dirname, 'data','users.json');

const getAll = async () => {
    const users = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(users);
};

const getOne = async (username) => {
    const users = await getAll();
    return users.find((e) => e.username === username);
};

const writeFile = async (data) => fs.writeFile(DATA_PATH, JSON.stringify(data));

const create = async (data) => {
    const users = await getAll();
    users.push(data);
    await writeFile(users);
};

module.exports = {
    getOne,
    create
};

