const fs = require('fs').promises;

const getSimpsons = async () => {
    const readFile = await fs.readFile('./simpsons.json', 'utf8');
    return JSON.parse(readFile);
};

const writeSimpson = async (character) => {
    await fs.writeFile('./simpsons.json',JSON.stringify(character));
}

module.exports ={getSimpsons, writeSimpson};