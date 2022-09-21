"use strict";
exports.__esModule = true;
var readline_sync_1 = require("readline-sync");
var scripts = [
    { name: 'Length Converter', script: './exercise5' },
    { name: 'Mass Converter', script: './exercise6' },
    { name: 'Capacity Converter', script: './exercise7' },
    { name: 'Area Converter', script: './exercise8' },
    { name: 'Volume Converter', script: './exercise9' },
];
var scriptsName = scripts.map(function (_a) {
    var name = _a.name;
    return name;
});
var chooseScript = readline_sync_1.keyInSelect(scriptsName, 'Choose an conversion script:');
var _a = require(scripts[chooseScript].script), units = _a.units, convert = _a.convert;
function exec() {
    var value = readline_sync_1.questionFloat("Enter the value to convert: \n");
    var choiceUnitFrom = readline_sync_1.keyInSelect(units, 'Choose a base unit: ');
    var choiceUnitTo = readline_sync_1.keyInSelect(units, 'Choose a unit to convert to: ');
    var result = convert(value, units[choiceUnitFrom], units[choiceUnitTo]);
    console.log("".concat(value).concat(choiceUnitFrom, " it's the same as ").concat(result).concat(choiceUnitTo, " "));
}
exec();
