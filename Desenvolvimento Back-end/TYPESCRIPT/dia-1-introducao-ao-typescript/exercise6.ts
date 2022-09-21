const mass: Array<string> = ["kg", "hg", "dag", "g", "dg", "cg", "mg"];

function convertMass(value: number,fromUnit: string, toUnit: string): number {
    const firstIndex: number = mass.indexOf(fromUnit);
    const secondIndex: number = mass.indexOf(toUnit);
    return value * (10 ** (secondIndex - firstIndex));
}

module.exports =  { units: mass, convert: convertMass };