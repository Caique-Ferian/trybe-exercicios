import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Foods from '../Pages/Foods';
import Drinks from '../Pages/Drinks';
import Explore from '../Pages/Explore';
import DoneRecipes from '../Pages/DoneRecipes';
import FoodDetails from '../Pages/FoodDetails';
import DrinksDetails from '../Pages/DrinksDetails';
import FoodsInProgress from '../Pages/FoodsInProgress';
import DrinksInProgress from '../Pages/DrinksInProgress';
import ExploreDrinks from '../Pages/ExploreDrinks';
import ExploreFoods from '../Pages/ExploreFoods';
import ExploreIngredients from '../Pages/ExploreIngredients';
import ExploreNationalities from '../Pages/ExploreNationalities';
import Profile from '../Pages/Profile';
import FavoriteRecipes from '../Pages/FavoriteRecipes';
import NotFound from '../Pages/NotFoud';
//

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/foods/:id" component={ FoodDetails } />
      <Route
        exact
        path="/foods/:id/in-progress"
        component={ FoodsInProgress }
      />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks/:id" component={ DrinksDetails } />
      <Route
        exact
        path="/drinks/:id/in-progress"
        component={ DrinksInProgress }
      />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/foods/ingredients" component={ ExploreIngredients } />
      <Route exact path="/explore/drinks/ingredients" component={ ExploreIngredients } />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreNationalities }
      />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/explore/drinks/nationalities" component={ NotFound } />
    </Switch>
  );
}
