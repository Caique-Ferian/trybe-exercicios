const data = require('../data/zoo_data');

const { employees } = data;

function isManager(id) {
  return employees.some(({ managers }) => managers.some((element) => element === id));
}
function getRelatedEmployees(managerId) {
  if (!isManager(managerId)) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
  const result = [];
  const collaborator = employees.filter(({ managers }) => managers
    .some((valor) => valor === managerId));
  collaborator.forEach((element) => result.push(`${element.firstName} ${element.lastName}`));
  return result;
}
// Feito com a ajuda do repositorio de Kleverson Eller.
module.exports = { isManager, getRelatedEmployees };
