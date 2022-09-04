import { useMemo, useCallback } from 'react';
import useStarWars from './index';

export default function useFilterByName() {
  const { data, setFilteredData } = useStarWars();

  const filterByName = useCallback((name) => {
    setFilteredData(data?.filter((element) => element.name.toLowerCase()
      .includes(name.toLowerCase())));
  }, [data, setFilteredData]);
  return useMemo(() => ({
    filterByName,
  }), [filterByName]);
}
