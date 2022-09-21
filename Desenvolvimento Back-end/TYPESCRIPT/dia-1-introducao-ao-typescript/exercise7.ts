const capacitys: Array<string> = ["kl", "hl", "dal", "l", "dl", "cl", "ml"];

function convertCapacity(value: number,fromUnit: string, toUnit: string): number {
    const firstIndex: number = capacitys.indexOf(fromUnit);
    const secondIndex: number = capacitys.indexOf(toUnit);
    return value * (10 ** (secondIndex - firstIndex));
}

module.exports = { units: capacitys, convert: convertCapacity };