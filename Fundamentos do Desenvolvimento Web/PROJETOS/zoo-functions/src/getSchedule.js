const data = require('../data/zoo_data');

const { species, hours } = data;

const validateIf = (animal) => {
  const animals = species.map((element) => element.name);
  return animals.some((element) => element.includes(animal));
};

const validateIf2 = (day) => {
  const days = Object.keys(hours);
  return days.some((element) => element.includes(day));
};

const searchingAnimals = (day) => {
  const animalsInTheDay = species.filter((animal, index) => animal.availability
    .some((element) => element === day)).map((elem) => elem.name);
  return animalsInTheDay;
};
function createObject() {
  const object = {};
  const workingDays = Object.keys(hours);
  const openingHours = Object.values(hours);
  for (let index = 0; index < workingDays.length; index += 1) {
    if (workingDays[index] !== 'Monday') {
      object[workingDays[index]] = {
        officeHour: `Open from ${openingHours[index].open}am until ${openingHours[index].close}pm`,
        exhibition: searchingAnimals(workingDays[index]),
      };
    } else {
      object[workingDays[index]] = {
        officeHour: 'CLOSED',
        exhibition: 'The zoo will be closed!',
      };
    }
  }
  return object;
}
function getSchedule(scheduleTarget) {
  if (validateIf(scheduleTarget)) {
    return species.find((animal) => animal.name === scheduleTarget).availability;
  } if (validateIf2(scheduleTarget)) {
    const schedule = createObject();
    return { [scheduleTarget]: schedule[scheduleTarget] };
  }
  return createObject();
}
console.log(getSchedule('Monday'));
module.exports = getSchedule;
