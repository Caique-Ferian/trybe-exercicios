const areas: Array<string> = ["km²", "hm²", "dam²", "m²", "dm²", "cm²", "mm²"];

function convertArea(value: number,fromUnit: string, toUnit: string): number {
    const firstIndex: number = areas.indexOf(fromUnit);
    const secondIndex: number = areas.indexOf(toUnit);
    return value * (100 ** (secondIndex - firstIndex));
}

module.exports = { units: areas, convert: convertArea  };