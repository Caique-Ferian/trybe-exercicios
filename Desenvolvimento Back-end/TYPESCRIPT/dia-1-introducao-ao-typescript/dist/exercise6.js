"use strict";
const mass = ["kg", "hg", "dag", "g", "dg", "cg", "mg"];
function convertMass(value, fromUnit, toUnit) {
    const firstIndex = mass.indexOf(fromUnit);
    const secondIndex = mass.indexOf(toUnit);
    return value * (10 ** (secondIndex - firstIndex));
}
module.exports = { units: mass, convert: convertMass };
