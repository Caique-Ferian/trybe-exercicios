const data = require('../data/zoo_data');

const { species } = data;
const animalsByLocation = (location) => species.filter((animal) => location
  .includes(animal.location));

const anothersIfs = (location) => {
  const fill = [];
  const animals = animalsByLocation(location)
    .filter((element) => element.location === location).map((animal) => animal.name);
  for (let index = 0; index < animals.length; index += 1) {
    fill.push(animals[index]);
  }
  return fill;
};
const fillObject = (array) => {
  const fill = [];
  for (let index = 0; index < array.length; index += 1) {
    fill.push(array[index]);
  }
  return fill;
};
const fillObjectBySex = (array, sort) => {
  const fill = [];
  for (let index = 0; index < array.length; index += 1) {
    if (array[index].sex === 'female') {
      fill.push(array[index].name);
    }
  }
  if (sort) {
    return fill.sort();
  }
  return fill;
};
const fillObjectByName = (array, sort, sex) => {
  const fill = [];
  for (let index = 0; index < array.length; index += 1) {
    if (sex === 'female') {
      const fillSex = fillObjectBySex(array, sort);
      return fillSex;
    }
    fill.push(array[index].name);
  }
  if (sort) {
    return fill.sort();
  }
  return fill;
};
const anothersIfsName3 = (name, array1, array2, sort, sex) => {
  const objeto = {};
  const createArray = array1;
  if (name === 'penguins') {
    objeto[name] = fillObjectByName(array2.residents, sort, sex);
    createArray.push(objeto);
  } if (name === 'otters') {
    objeto[name] = fillObjectByName(array2.residents, sort, sex);
    createArray.push(objeto);
  }
  return createArray;
};
const anothersIfsName2 = (name, array1, array2, sort, sex) => {
  const objeto = {};
  const createArray = array1;
  if (name === 'tigers') {
    objeto[name] = fillObjectByName(array2.residents, sort, sex);
    createArray.push(objeto);
  } if (name === 'bears') {
    objeto[name] = fillObjectByName(array2.residents, sort, sex);
    createArray.push(objeto);
  } if (name === 'elephants') {
    objeto[name] = fillObjectByName(array2.residents, sort, sex);
    createArray.push(objeto);
  } else {
    anothersIfsName3(name, array1, array2, sort, sex);
  }
  return createArray;
};
const anothersIfsName = (name, array1, array2, sort, sex) => {
  const objeto = {};
  const createArray = array1;
  if (name === 'giraffes') {
    objeto[name] = fillObjectByName(array2.residents, sort, sex);
    createArray.push(objeto);
  } if (name === 'frogs') {
    objeto[name] = fillObjectByName(array2.residents, sort, sex);
    createArray.push(objeto);
  } if (name === 'snakes') {
    objeto[name] = fillObjectByName(array2.residents, sort, sex);
    createArray.push(objeto);
  } else {
    anothersIfsName2(name, array1, array2, sort, sex);
  }
  return createArray;
};
const validateAnimals = (array, sort, sex) => {
  const createArray = [];
  const object = {};
  for (let index = 0; index < array.length; index += 1) {
    if (array[index].name === 'lions') {
      object[array[index].name] = fillObjectByName(array[index].residents, sort, sex);
      createArray.push(object);
    } else {
      anothersIfsName(array[index].name, createArray, array[index], sort, sex);
    }
  }
  return createArray;
};
const createObjectAnimalsByLocation = (...location) => {
  const objectAnimals = {};
  const animals = animalsByLocation(location);
  for (let index = 0; index < location.length; index += 1) {
    if (location[index] === 'NE') {
      const animalsNe = animals.filter((element) => element.location === location[index])
        .map((animal) => animal.name);
      objectAnimals.NE = fillObject(animalsNe);
    } if (location[index] === 'SW') {
      const animalsSw = animals.filter((element) => element.location === location[index])
        .map((animal) => animal.name);
      objectAnimals.SW = fillObject(animalsSw);
    }
    objectAnimals.NW = anothersIfs('NW');
    objectAnimals.SE = anothersIfs('SE');
  }
  return objectAnimals;
};
const createObjectAnimalsByName = (location, sort, sex) => {
  const objectAnimals = {};
  const animals = animalsByLocation(location);
  for (let index = 0; index < location.length; index += 1) {
    if (location[index] === 'NE') {
      const animalsNe = animals.filter((element) => element.location === location[index])
        .map((animal) => animal);
      objectAnimals.NE = validateAnimals(animalsNe, sort, sex);
    } if (location[index] === 'SW') {
      const animalsSw = animals.filter((element) => element.location === location[index])
        .map((animal) => animal);
      objectAnimals.SW = validateAnimals(animalsSw, sort, sex);
    } const animalsNw = animals.filter((element) => element.location === 'NW')
      .map((animal) => animal);
    objectAnimals.NW = validateAnimals(animalsNw, sort, sex);
    const animalsSe = animals.filter((element) => element.location === 'SE')
      .map((animal) => animal);
    objectAnimals.SE = validateAnimals(animalsSe, sort, sex);
  } return objectAnimals;
};
function getAnimalMapIfs3(options) {
  if (options.includeNames) {
    return true;
  }
}
function getAnimalMapIfs2(options) {
  if (options.includeNames && options.sorted) {
    return true;
  } if (options.includeNames && !options.sex === false) {
    return true;
  } return getAnimalMapIfs3(options);
}
function getAnimalMapIfs(options) {
  if (options.includeNames && options.sorted && !options.sex === false) {
    return true;
  }
  return getAnimalMapIfs2(options);
}
function getAnimalMap(options) {
  const allOptions = options;
  const allAnimalsByLocation = createObjectAnimalsByLocation('NE', 'SW');
  if (!allOptions) {
    return allAnimalsByLocation;
  } if (getAnimalMapIfs(allOptions)) {
    if (!allOptions.sorted && !allOptions.sex) {
      allOptions.sorted = false;
      allOptions.sex = 'male';
      return createObjectAnimalsByName(['NE', 'SW', 'NW', 'SE'], allOptions.sorted, allOptions.sex);
    }
    return createObjectAnimalsByName(['NE', 'SW', 'NW', 'SE'], allOptions.sorted, allOptions.sex);
  }
  return allAnimalsByLocation;
}
const test = getAnimalMap({ includeNames: true, sorted: true, sex: 'female' });
console.log(test.NW);
module.exports = getAnimalMap;
