import React, { useState } from 'react';
import useOrder from '../../hook/orderHook';

export default function OrderTableComponent() {
  const [column, setColumn] = useState('population');
  const [sort, setSort] = useState('');
  const { orderTable } = useOrder();
  const initialSelects = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water', 'ASC', 'DESC'];
  const FOUR = 4;
  return (
    <div>
      <select
        data-testid="column-sort"
        value={ column }
        onChange={ ({ target }) => setColumn(target.value) }
      >
        {initialSelects.map((element, index) => index <= FOUR
        && <option key={ index }>{element}</option>)}
      </select>
      {initialSelects.map((element, index) => index > FOUR
      && (
        <label htmlFor={ element } key={ index }>
          <input
            id={ element }
            type="radio"
            value={ element }
            name="sort"
            onChange={ ({ target }) => setSort(target.value) }
            data-testid={ `column-sort-input-${element.toLowerCase()}` }
          />
          {element === 'ASC' ? 'Ascendente' : 'Descendente'}
        </label>))}
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ () => orderTable({ sort, column }) }
      >
        Ordenar

      </button>
    </div>
  );
}
