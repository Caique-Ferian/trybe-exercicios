function math (a,b,c) {
    return new Promise ((resolve,reject) => {
        if(typeof a !== 'number' || typeof b !== 'number'||typeof c !== 'number') return reject(new Error ("Informe apenas números"));
        const calc = (a+b) * c;
        if (calc < 50) return reject(new Error ("Valor muito baixo"));
        return resolve(calc);
    });
}

// math(10,20,30)
//     .then((resolve) => console.log(resolve))
//     .catch((e) => console.log(e.message));

module.exports = math;