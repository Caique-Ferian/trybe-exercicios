const createTriangle = (sideA,sideB,sideC) => {
    if(sideA === sideB && sideB === sideC) return console.log('Triâgulo Equilátero');
    if(
        (sideA === sideB && sideA !== sideC)
        || (sideA === sideC && sideA !== sideB)
        || (sideC === sideB && sideC !== sideA)) {
            return console.log('Triângulo Isósceles');
        }
    return console.log('Triângulo Escaleno');
}

createTriangle(3,4,5);