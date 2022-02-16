const data = require('../data/zoo_data');

const { species } = data;

function getSpeciesByIds(...ids) {
  // const searchingSpecies = [];
  // ids.forEach((id) => searchingSpecies.push(species.find((element) => element.id === id)));
  // return searchingSpecies;
  return species.filter((element) => ids.includes(element.id));
}
module.exports = getSpeciesByIds;
