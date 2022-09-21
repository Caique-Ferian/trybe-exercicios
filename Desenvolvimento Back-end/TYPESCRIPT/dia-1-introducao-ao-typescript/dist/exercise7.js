"use strict";
const capacitys = ["kl", "hl", "dal", "l", "dl", "cl", "ml"];
function convertCapacity(value, fromUnit, toUnit) {
    const firstIndex = capacitys.indexOf(fromUnit);
    const secondIndex = capacitys.indexOf(toUnit);
    return value * (10 ** (secondIndex - firstIndex));
}
module.exports = { units: capacitys, convert: convertCapacity };
