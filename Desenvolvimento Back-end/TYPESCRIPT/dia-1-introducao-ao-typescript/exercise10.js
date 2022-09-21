"use strict";
exports.__esModule = true;
var exercise5_1 = require("./exercise5");
var readline_sync_1 = require("readline-sync");
function exec() {
    var value = readline_sync_1.questionFloat("Enter the value to convert: \n");
    var choiceUnitFrom = readline_sync_1.keyInSelect(exercise5_1.units, 'Choose a base unit: ');
    var choiceUnitTo = readline_sync_1.keyInSelect(exercise5_1.units, 'Choose a unit to convert to: ');
    var result = (0, exercise5_1.convert)(value, exercise5_1.units[choiceUnitFrom], exercise5_1.units[choiceUnitTo]);
    console.log("".concat(value).concat(choiceUnitFrom, " it's the same as ").concat(result).concat(choiceUnitTo, " "));
}
exec();
