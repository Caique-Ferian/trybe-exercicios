const fs = require('fs').promises
const readline = require('readline');

function question(message) {
    const readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        readlineInterface.question(message,(answer) => {
            readlineInterface.close();
            resolve(answer);
        });
    });
}

async function main() {
    const fileName = await question('Digite o caminho do arquivo que deseja ler: ');

    try {
        const fileContent = await fs.readFile(fileName,'utf-8');
        console.log(fileContent);
    } catch (e) {
        console.log('Arquivo Inexistente');
    }
}
main();