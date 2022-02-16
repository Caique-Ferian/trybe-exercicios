const data = require('../data/zoo_data');

const { prices } = data;
const createObject = (age) => {
  const objeto = { child: 0, adult: 0, senior: 0 };
  for (let index = 0; index < age.length; index += 1) {
    if (age[index] < 18) {
      objeto.child += 1;
    } if (age[index] >= 50) {
      objeto.senior += 1;
    }
    objeto.adult = (age.length - (objeto.child + objeto.senior));
  }
  return objeto;
};
function countEntrants(entrants) {
  const allAges = entrants.map((peoples) => peoples.age);
  return createObject(allAges);
}
function calculateEntry(entrants) {
  if (!entrants) {
    return 0;
  } if (Object.keys(entrants).length === 0) {
    return 0;
  }
  const peoples = countEntrants(entrants);
  const { child, adult, senior } = peoples;
  const result = (child * prices.child) + (adult * prices.adult) + (senior * prices.senior);
  return result;
}

module.exports = { calculateEntry, countEntrants };
