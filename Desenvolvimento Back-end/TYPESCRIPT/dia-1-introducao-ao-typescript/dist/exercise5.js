"use strict";
const lengths = ["km", "hm", "dam", "m", "dm", "cm", "mm"];
function convertLength(value, fromUnit, toUnit) {
    const firstIndex = lengths.indexOf(fromUnit);
    const secondIndex = lengths.indexOf(toUnit);
    return value * (10 ** (secondIndex - firstIndex));
}
module.exports = { units: lengths, convert: convertLength };
