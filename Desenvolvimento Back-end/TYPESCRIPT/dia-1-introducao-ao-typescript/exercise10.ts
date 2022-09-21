interface selectedScript {
    units: Array<string>,
    convert: Function,
}

const { units,convert }: selectedScript = require('./exercise5');
import readline from "readline-sync"

function exec(): void {
    const value = readline.questionFloat("Enter the value to convert: \n");
    const choiceUnitFrom = readline.keyInSelect(units,'Choose a base unit: ');
    const choiceUnitTo =readline.keyInSelect(units,'Choose a unit to convert to: ');

    const result: number = convert(value, units[choiceUnitFrom], units[choiceUnitTo]);

    console.log(`${value}${choiceUnitFrom} it's the same as ${result}${choiceUnitTo} `);
}

exec();