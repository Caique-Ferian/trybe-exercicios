const data = require('../data/zoo_data');

const { employees, species } = data;

const searchingAnimalsLocation = (array, index) => {
  const animals = [];
  for (let i = 0; i < array[index].length; i += 1) {
    animals.push(species.find((element) => element.id === array[index][i]).location);
  }
  return animals;
};
const searchingAnimals = (array, index) => {
  const animals = [];
  for (let i = 0; i < array[index].length; i += 1) {
    animals.push(species.find((element) => element.id === array[index][i]).name);
  }
  return animals;
};
function createArray() {
  const array = [];
  const employersId = employees.map((element) => element.id);
  const employersFirstName = employees.map((element) => element.firstName);
  const employersLastName = employees.map((element) => element.lastName);
  const employersResponsibleFor = employees.map((element) => element.responsibleFor);
  for (let index = 0; index < employersId.length; index += 1) {
    array.push({ id: employersId[index],
      fullName: `${employersFirstName[index]} ${employersLastName[index]}`,
      species: searchingAnimals(employersResponsibleFor, index),
      locations: searchingAnimalsLocation(employersResponsibleFor, index),
    });
  }
  return array;
}
const validateIf = (name) => {
  const employers = createArray();
  return employers.some((element) => element.fullName.includes(name));
};
const validateIf2 = (id) => {
  const employers = createArray();
  return employers.some((element) => element.id.includes(id));
};
function getEmployeesCoverage(options) {
  const allEmployers = createArray();
  if (!options) {
    return allEmployers;
  }
  if (validateIf(options.name)) {
    return allEmployers.find((employer) => employer.fullName.includes(options.name));
  } if (validateIf2(options.id)) {
    return allEmployers.find((employer) => employer.id.includes(options.id));
  }
  throw new Error('Informações inválidas');
}
module.exports = getEmployeesCoverage;
