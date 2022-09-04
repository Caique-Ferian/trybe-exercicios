import React, { useState } from 'react';
import useFilterByNumericValues from '../../hook/filterByNumericValuesHook';

export default function FilterByNumValueComponent() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const selectComp = ['maior que', 'menor que', 'igual a'];
  const { addFilters, setFiltering, filterByNumericValues,
    removeFilter, selects, setSelects } = useFilterByNumericValues();
  const handleClick = () => {
    addFilters({ column, comparison, value });
    setFiltering(true);
    setSelects(selects.filter((element) => element !== column));
  };
  return (
    <div>
      <select
        data-testid="column-filter"
        value={ column }
        onChange={ ({ target }) => setColumn(target.value) }
      >
        {selects.map((element, index) => (
          <option key={ index }>{element}</option>))}
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ ({ target }) => setComparison(target.value) }
      >
        {selectComp.map((element, index) => (
          <option key={ index }>{element}</option>))}
      </select>
      <input
        data-testid="value-filter"
        type="number"
        placeholder="Digite um valor"
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
      >
        Filtrar

      </button>
      {filterByNumericValues?.map(({ column: filterName }, index) => (
        <div key={ index } data-testid="filter">
          <button
            type="button"
            onClick={ () => removeFilter(filterName) }
          >
            X
          </button>
          <span>{filterName}</span>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => { removeFilter('ALL'); setColumn('population'); } }
      >
        Remover Filtros
      </button>
    </div>
  );
}
