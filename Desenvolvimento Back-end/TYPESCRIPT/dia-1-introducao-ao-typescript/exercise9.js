var volumes = ["km³", "hm³", "dam³", "m³", "dm³", "cm³", "mm³"];
;
function convertVolume(value, fromUnit, toUnit) {
    var firstIndex = volumes.indexOf(fromUnit);
    var secondIndex = volumes.indexOf(toUnit);
    return value * (Math.pow(1000, (secondIndex - firstIndex)));
}
module.exports = { units: volumes, convert: convertVolume };
