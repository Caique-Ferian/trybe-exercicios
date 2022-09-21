const volumes: Array<string> = ["km³", "hm³", "dam³", "m³", "dm³", "cm³", "mm³"];;

function convertVolume(value: number,fromUnit: string, toUnit: string): number {
    const firstIndex: number = volumes.indexOf(fromUnit);
    const secondIndex: number = volumes.indexOf(toUnit);
    return value * (1000 ** (secondIndex - firstIndex));
}

module.exports = { units: volumes, convert: convertVolume };