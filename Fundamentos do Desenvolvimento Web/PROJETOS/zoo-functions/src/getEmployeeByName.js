const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  return data.employees.find((employer) => employer.firstName === employeeName
  || employer.lastName === employeeName);
}

module.exports = getEmployeeByName;
