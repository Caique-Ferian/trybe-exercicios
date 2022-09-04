const fs = require('fs').promises;

module.exports = async (talker) => {
    await fs.writeFile('./talker.json', JSON.stringify(talker));
};