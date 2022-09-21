var mass = ["kg", "hg", "dag", "g", "dg", "cg", "mg"];
function convertMass(value, fromUnit, toUnit) {
    var firstIndex = mass.indexOf(fromUnit);
    var secondIndex = mass.indexOf(toUnit);
    return value * (Math.pow(10, (secondIndex - firstIndex)));
}
module.exports = { units: mass, convert: convertMass };
