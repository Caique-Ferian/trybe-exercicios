import readline from "readline-sync"

interface script {
    name: string,
    script: string,
}

interface selectedScript {
    units: Array<string>,
    convert: Function,
}

const scripts: script[] = [
    { name: 'Length Converter', script: './exercise5' },
    { name: 'Mass Converter', script: './exercise6' },
    { name: 'Capacity Converter', script: './exercise7' },
    { name: 'Area Converter', script: './exercise8' },
    { name: 'Volume Converter', script: './exercise9' },
];

const scriptsName: Array<string> = scripts.map(({name}) => name);

const chooseScript = readline.keyInSelect(scriptsName,'Choose an conversion script:');

const {units,convert}: selectedScript =  require(scripts[chooseScript].script);

function exec(): void {
    const value = readline.questionFloat("Enter the value to convert: \n");
    const choiceUnitFrom = readline.keyInSelect(units,'Choose a base unit: ');
    const choiceUnitTo =readline.keyInSelect(units,'Choose a unit to convert to: ');

    const result: number = convert(value, units[choiceUnitFrom], units[choiceUnitTo]);

    console.log(`${value}${choiceUnitFrom} it's the same as ${result}${choiceUnitTo} `);
}

exec();

interface ProcessIdentity<T, U> {
    (value: T, message: U): T;
}

// function processIdentity<T, U> (value: T, message: U) : T {
//     console.log(message);
//     return value
// }

// let processor: ProcessIdentity<number, string> = processIdentity;

const processor : ProcessIdentity<number, string> = (value: number, message: string) : number => {
    console.log(message);
    return value;
}

let returnNumber = processor(100, "Olá");
let returnString = processor("Olá", 100); // Type check error: Argument of type "string" is not assignable to parameter of type "number".