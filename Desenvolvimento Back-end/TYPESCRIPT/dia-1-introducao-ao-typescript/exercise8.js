var areas = ["km²", "hm²", "dam²", "m²", "dm²", "cm²", "mm²"];
function convertArea(value, fromUnit, toUnit) {
    var firstIndex = areas.indexOf(fromUnit);
    var secondIndex = areas.indexOf(toUnit);
    return value * (Math.pow(100, (secondIndex - firstIndex)));
}
module.exports = { units: areas, convert: convertArea };
