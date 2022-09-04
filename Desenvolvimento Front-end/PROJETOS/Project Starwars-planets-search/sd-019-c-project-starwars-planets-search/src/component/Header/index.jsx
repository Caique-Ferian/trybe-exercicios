import React from 'react';
import FilterByNameComponent from '../FilterByName';
import FilterByNumValueComponent from '../FilterByNumValue';
import OrderTableComponent from '../OrderTable';

export default function Header() {
  return (
    <div>
      <FilterByNameComponent />
      <FilterByNumValueComponent />
      <OrderTableComponent />
    </div>
  );
}
