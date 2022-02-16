const data = require('../data/zoo_data');

const { species } = data;

const createObject = (allAnimals, quantity) => {
  const objeto = {};
  for (let index = 0; index < quantity.length; index += 1) {
    objeto[allAnimals[index]] = quantity[index];
  }
  return objeto;
};
const countFemale = (animals) => {
  let counterFemale = 0;
  for (let index = 0; index < animals.length; index += 1) {
    if (animals[index].sex === 'female') {
      counterFemale += 1;
    }
  }
  return counterFemale;
};
const countMale = (animals) => {
  let counterMale = 0;
  for (let index = 0; index < animals.length; index += 1) {
    if (animals[index].sex === 'male') {
      counterMale += 1;
    }
  }
  return counterMale;
};

function countAnimals(animal) {
  if (!animal) {
    const allAnimals = species.filter((element) => element.name);
    const allNames = allAnimals.map((element) => element.name);
    const animalsQuantity = allAnimals.map((element) => element.residents.length);
    const result = createObject(allNames, animalsQuantity);
    return result;
  }
  const animals = species.find((element) => element.name.includes(animal.specie)).residents;
  if (Object.keys(animal).length === 2) {
    if (animal.sex === 'female') {
      return countFemale(animals);
    }
    return countMale(animals);
  }
  return animals.length;
}
console.log(countAnimals({ specie: 'bears', sex: 'male' }));
module.exports = countAnimals;
