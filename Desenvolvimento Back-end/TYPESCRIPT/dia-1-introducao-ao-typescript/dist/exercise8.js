"use strict";
const areas = ["km²", "hm²", "dam²", "m²", "dm²", "cm²", "mm²"];
function convertArea(value, fromUnit, toUnit) {
    const firstIndex = areas.indexOf(fromUnit);
    const secondIndex = areas.indexOf(toUnit);
    return value * (100 ** (secondIndex - firstIndex));
}
module.exports = { units: areas, convert: convertArea };
