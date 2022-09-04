const fs = require('fs').promises;

const readFile = async () => {
    const content = await fs.readFile('./talker.json', 'utf-8');
    return JSON.parse(content);
};
const writeFile = async (talker) => {
    await fs.writeFile('./talker.json', JSON.stringify(talker));
};
module.exports = { readFile, writeFile };