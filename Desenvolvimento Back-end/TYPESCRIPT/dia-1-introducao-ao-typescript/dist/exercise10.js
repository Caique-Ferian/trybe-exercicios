"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { units, convert } = require('./exercise5');
const readline_sync_1 = __importDefault(require("readline-sync"));
function exec() {
    const value = readline_sync_1.default.questionFloat("Enter the value to convert: \n");
    const choiceUnitFrom = readline_sync_1.default.keyInSelect(units, 'Choose a base unit: ');
    const choiceUnitTo = readline_sync_1.default.keyInSelect(units, 'Choose a unit to convert to: ');
    const result = convert(value, units[choiceUnitFrom], units[choiceUnitTo]);
    console.log(`${value}${choiceUnitFrom} it's the same as ${result}${choiceUnitTo} `);
}
exec();
