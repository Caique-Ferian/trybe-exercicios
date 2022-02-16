const sum = (...args) =>args.reduce((acc,currentValue) => acc+currentValue,0);
console.log(sum(1,2,3,4,5,6,7));