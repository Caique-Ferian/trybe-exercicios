const lengths: Array<string> = ["km", "hm", "dam", "m", "dm", "cm", "mm"];

function convertLength(value: number,fromUnit: string, toUnit: string): number {
    const firstIndex: number = lengths.indexOf(fromUnit);
    const secondIndex: number = lengths.indexOf(toUnit);
    return value * (10 ** (secondIndex - firstIndex));
}

module.exports =  { units: lengths, convert: convertLength };