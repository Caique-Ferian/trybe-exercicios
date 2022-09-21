"use strict";
const volumes = ["km³", "hm³", "dam³", "m³", "dm³", "cm³", "mm³"];
;
function convertVolume(value, fromUnit, toUnit) {
    const firstIndex = volumes.indexOf(fromUnit);
    const secondIndex = volumes.indexOf(toUnit);
    return value * (1000 ** (secondIndex - firstIndex));
}
module.exports = { units: volumes, convert: convertVolume };
