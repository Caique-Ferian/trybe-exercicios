var capacitys = ["kl", "hl", "dal", "l", "dl", "cl", "ml"];
function convertCapacity(value, fromUnit, toUnit) {
    var firstIndex = capacitys.indexOf(fromUnit);
    var secondIndex = capacitys.indexOf(toUnit);
    return value * (Math.pow(10, (secondIndex - firstIndex)));
}
module.exports = { units: capacitys, convert: convertCapacity };
