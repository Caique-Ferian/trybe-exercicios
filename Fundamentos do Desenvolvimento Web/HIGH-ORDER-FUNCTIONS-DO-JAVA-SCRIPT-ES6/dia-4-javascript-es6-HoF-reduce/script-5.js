const names = [
    'Aanemarie', 'Adervandes', 'Akifusa',
    'Abegildo', 'Adicellia', 'Aladonata',
    'Abeladerco', 'Adieidy', 'Alarucha',
  ];
  
  function containsA(array) {
    return array.join(' ').toLowerCase().split('').reduce((count,letter) =>(letter === 'a')? count +=1 : count,0);
}
console.log(containsA(names));