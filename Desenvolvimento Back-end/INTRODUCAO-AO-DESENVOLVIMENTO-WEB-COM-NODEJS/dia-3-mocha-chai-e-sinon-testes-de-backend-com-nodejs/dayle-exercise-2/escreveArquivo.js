const fs = require('fs');

module.exports = (path,content) => {
    fs.writeFileSync(path, content);
    return 'ok';
};