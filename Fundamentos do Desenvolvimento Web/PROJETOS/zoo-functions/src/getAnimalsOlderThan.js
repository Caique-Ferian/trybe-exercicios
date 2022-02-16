const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return data.species.find((element) => element.name === animal)
    .residents.every((elem) => elem.age >= age);
}

module.exports = getAnimalsOlderThan;
