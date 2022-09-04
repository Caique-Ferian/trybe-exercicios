const fs = require('fs').promises;

// EXERCÍCIO 1
// async function main() {
//     try {
//         const result = await fs.readFile('./simpsons.json', 'utf-8');
//         return JSON.parse(result).map(({id,name}) => console.log(`${id} - ${name}`));
//     } catch (e) {
//         console.error(e);
//     }
// }
// main();

// EXERCÍCIO 2
// const findSimpson = async (idToSearch) => {
//     const fileContent = await fs.readFile('./simpsons.json', 'utf-8');
//     const simpsons = JSON.parse(fileContent);

//     const searchingSimpson = simpsons.find(({id}) => +id === idToSearch);
//     if (!searchingSimpson) throw new Error ("id não encontrado");
//     return searchingSimpson;
// }

// findSimpson(1)
//     .then((simpson) => console.log(simpson))
//     .catch((e) => console.log(e.message));

// EXERCÍCIO 3
// const editingSimpson = async () => {
//     const fileContent = await fs.readFile('./simpsons.json', 'utf-8');
//     const simpsons = JSON.parse(fileContent);

//     const editingSimpson = simpsons.filter(({id}) => +id !== 10 && +id !== 6);
//     const writing = await fs.writeFile('./simpsons.json',JSON.stringify(editingSimpson));
// }
// editingSimpson();

// EXERCÍCIO 4
// const familySimpson = async () => {
//     const fileContent = await fs.readFile('./simpsons.json', 'utf-8');
//     const simpsons = JSON.parse(fileContent);

//     const createFamily = simpsons.filter(({id}) => +id === 1 || +id === 4);
//     const createFile = await fs.writeFile('./simpsonFamily.json',JSON.stringify(createFamily));
// }
// familySimpson();

// EXERCÍCIO 5
// const familySimpsonAdding = async () => {
//     const fileContent = await fs.readFile('./simpsonFamily.json', 'utf-8');
//     const simpsons = JSON.parse(fileContent);

//     simpsons.push({ id: '8', name: 'Nelson Muntz' });
//     const addingFile = await fs.writeFile('./simpsonFamily.json',JSON.stringify(simpsons));
// }
// familySimpsonAdding();

// EXERCÍCIO 6
// const familySimpsonEditing = async () => {
//     const fileContent = await fs.readFile('./simpsonFamily.json', 'utf-8');
//     const simpsons = JSON.parse(fileContent);

//     const editingFamily = simpsons.filter(({id}) => +id !== 8);
//     editingFamily.push( {"id": "5","name": "Maggie Simpson"})
//     const editFile = await fs.writeFile('./simpsonFamily.json',JSON.stringify(editingFamily));
// }
// familySimpsonEditing();