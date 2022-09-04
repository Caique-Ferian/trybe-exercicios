import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFoodsOrDrinks } from '../../Redux/actions';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CardItem from '../../components/CardItem';
import FilterButton from '../../components/FIlterButton';

export default function Drinks() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.apiReducer);
  const { apiResult, isRedirecting } = data;
  useEffect(() => {
    if (!isRedirecting)dispatch(fetchFoodsOrDrinks('Drinks'));
  }, [dispatch, isRedirecting]);
  return (
    <div>
      <Header title="Drinks" />
      <FilterButton type="Drinks" />
      {apiResult.length ? apiResult.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
        <Link key={ index } to={ `/drinks/${idDrink}` }>
          <CardItem
            index={ index }
            srcImg={ strDrinkThumb }
            name={ strDrink }
          />
        </Link>)) : null}
      <Footer />
    </div>
  );
}
