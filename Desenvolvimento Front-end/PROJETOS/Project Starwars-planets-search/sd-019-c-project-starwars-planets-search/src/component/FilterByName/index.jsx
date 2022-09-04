import React from 'react';
import useFilterByName from '../../hook/filterByNameHook';

export default function FilterByNameComponent() {
  const { filterByName } = useFilterByName();
  return (
    <input
      data-testid="name-filter"
      type="text"
      placeholder="Digite o planeta desejado"
      onChange={ ({ target }) => filterByName(target.value) }
    />
  );
}
