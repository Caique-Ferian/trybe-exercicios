const data = require('../data/zoo_data');

const { species, employees } = data;
const verifyTheOldest = (array) => {
  let older = 0;
  for (let index = 0; index < array.length; index += 1) {
    if (array[index] > older) {
      older = array[index];
    }
  }
  return older;
};
const createArray = (array) => {
  const listAnimals = [];
  const agesArray = array.map((animal) => animal.age);
  const olderAnimal = verifyTheOldest(agesArray);
  for (let index = 0; index < agesArray.length; index += 1) {
    if (array[index].age === olderAnimal) {
      listAnimals.push(array[index].name, array[index].sex, olderAnimal);
    }
  }
  return listAnimals;
};
function getOldestFromFirstSpecies(id) {
  const getFirstAnimalResponsible = employees.filter((person) => id.includes(person.id))
    .map((element) => element.responsibleFor[0]);
  const animalsObjectList = [];
  getFirstAnimalResponsible.forEach((personId) => animalsObjectList.push(species
    .find((specie) => specie.id === personId)));
  const animals = animalsObjectList.map((animal) => animal.residents);
  return createArray(animals[0]);
}
module.exports = getOldestFromFirstSpecies;
