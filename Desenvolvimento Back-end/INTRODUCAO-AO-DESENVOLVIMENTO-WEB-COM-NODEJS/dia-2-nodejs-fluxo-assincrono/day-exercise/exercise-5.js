// const fs = require('fs').promises;

// const creatingFiles = async () => {
//     const strings = ['Finalmente', 'estou', 'usando', 'Promise.all', '!!!'];
//     const arrayFiles = strings.map((string,index) => fs.writeFile(`./file${index+1}.txt`,string));
//     await Promise.all(arrayFiles);
//     const filesName = ['file1.txt','file2.txt','file3.txt','file4.txt','file5.txt'];
//     const readArray = filesName.map((file) => fs.readFile(`./${file}`,'utf-8'));
//     const fileAll = await Promise.all(readArray);
//     await fs.writeFile('./fileAll.txt',fileAll.join(' '));

// }
// creatingFiles();

