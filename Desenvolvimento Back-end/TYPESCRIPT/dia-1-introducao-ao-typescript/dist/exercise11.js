"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const scripts = [
    { name: 'Length Converter', script: './exercise5' },
    { name: 'Mass Converter', script: './exercise6' },
    { name: 'Capacity Converter', script: './exercise7' },
    { name: 'Area Converter', script: './exercise8' },
    { name: 'Volume Converter', script: './exercise9' },
];
const scriptsName = scripts.map(({ name }) => name);
const chooseScript = readline_sync_1.default.keyInSelect(scriptsName, 'Choose an conversion script:');
const { units, convert } = require(scripts[chooseScript].script);
function exec() {
    const value = readline_sync_1.default.questionFloat("Enter the value to convert: \n");
    const choiceUnitFrom = readline_sync_1.default.keyInSelect(units, 'Choose a base unit: ');
    const choiceUnitTo = readline_sync_1.default.keyInSelect(units, 'Choose a unit to convert to: ');
    const result = convert(value, units[choiceUnitFrom], units[choiceUnitTo]);
    console.log(`${value}${choiceUnitFrom} it's the same as ${result}${choiceUnitTo} `);
}
exec();
