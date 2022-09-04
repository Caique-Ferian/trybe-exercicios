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
    const fileName = await question('Digite o caminho do arquivo que será lido: ');

    try {
        const fileContent = await fs.readFile(fileName,'utf-8');
        if (!fileContent) return;
        const whereChange = await question('Qual palavra deseja substituir? ');
        const whatChange = await question('E qual palavra deve ficar em seu lugar? ');
        const fileChanged = fileContent.replace(new RegExp(whereChange, 'gi'),whatChange);
        console.log('Edição feita com sucesso!');
        console.log(fileChanged);
        const destination = await question('Onde deseja salvar? ');
        await fs.writeFile(destination,fileChanged);
    } catch (e) {
        console.log('Erro ao ler arquivo!');
    }
}
main();