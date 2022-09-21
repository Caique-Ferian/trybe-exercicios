var lengths = ["km", "hm", "dam", "m", "dm", "cm", "mm"];
function convertLength(value, fromUnit, toUnit) {
    var firstIndex = lengths.indexOf(fromUnit);
    var secondIndex = lengths.indexOf(toUnit);
    return value * (Math.pow(10, (secondIndex - firstIndex)));
}
module.exports = { units: lengths, convert: convertLength };
