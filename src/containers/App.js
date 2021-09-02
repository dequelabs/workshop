import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Main, Layout } from 'cauldron-react';
import App from '../components/App';
import data from '../data';
import egg from '../img/icons/egg.svg';
import fire from '../img/icons/fire.svg';
import recipe from '../img/icons/recipe.svg';
import logo from '../img/icons/logo.svg';
import cog from '../img/icons/cog.svg';
import Settings from '../components/Settings';

const STORAGE_KEY = 'smashing-recipes';
const getData = () => {
  const storageData = localStorage.getItem(STORAGE_KEY);
  return storageData ? JSON.parse(storageData) : data;
};
const getStats = recipes => {
  const recipesMade = recipes.reduce((count, recipe) => {
    return count + recipe.cookCount;
  }, 0);
  const averageYumminess = data => {
    return (
      data.reduce((acc, recipe) => {
        return acc + recipe.yumminess;
      }, 0) / data.length
    )
      .toFixed(1)
      .replace(/[.,]0$/, '');
  };
  const histogram = [11, 12, 1, 2, 3, 4].map(month => {
    const monthRecipes = recipes.filter(
      recipe => Number(recipe.date.split('/')[0]) === month
    );
    return {
      month,
      average: averageYumminess(monthRecipes)
    };
  });

  const eggCount = recipes.reduce((acc, recipe) => {
    const recipeEggCount = recipe.ingredients.reduce(
      (totalEggs, ingredient) => {
        const match = ingredient.match(/(\d+).*egg/);
        if (match && match[1]) {
          return totalEggs + Number(match[1]);
        }

        return totalEggs;
      },
      0
    );

    return acc + recipeEggCount * recipe.cookCount;
  }, 0);
  const greaseFireCount = recipes.reduce((acc, recipe) => {
    return acc + recipe.greaseFireCount;
  }, 0);

  return [
    {
      label: 'Eggs used',
      value: eggCount,
      icon: egg
    },
    {
      label: 'Recipes made',
      value: recipesMade,
      icon: recipe
    },
    {
      label: 'Grease fires',
      value: greaseFireCount,
      icon: fire
    },
    {
      label: 'Yumminess',
      value: `${averageYumminess(recipes)}`,
      histogram
    }
  ];
};

const AppContainer = () => {
  const initialRecipes = useMemo(() => getData(), []);
  const initialStats = useMemo(() => getStats(initialRecipes), []);
  const [recipes, setRecipes] = useState(initialRecipes);
  const [stats, setStats] = useState(initialStats);
  const [modal, setModal] = useState({
    edit: null,
    view: null
  });

  const setData = updated => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };
  /**
   * Updates a recipe, specified by index and
   * saves it to local storage (our pseudo-db)
   */
  const updateRecipe = (index, updates) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[index] = {
      ...recipes[index],
      ...updates
    };

    setRecipes(updatedRecipes);
    setStats(getStats(updatedRecipes));
    setData(updatedRecipes);
  };
  const updateModalState = data => {
    setModal({
      ...modal,
      ...data
    });
  };

  return (
    <Router>
      <Layout>
        <Main id="main-content" aria-labelledby="main-heading">
          <div className="App">
            <nav className="dqpl-top-bar">
              <ul>
                <li>
                  <Link to="/" tabIndex={!modal.view && !modal.edit ? 0 : -1}>
                    <img alt="" role="presentation" src={logo} />
                    <span>awesome recipes</span>
                  </Link>
                </li>
                <li className="settings">
                  <Link
                    to="/settings"
                    tabIndex={!modal.view && !modal.edit ? 0 : -1}
                  >
                    <img alt="Settings" src={cog} />
                  </Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route exact path="/">
                <App
                  recipes={recipes}
                  stats={stats}
                  updateRecipe={updateRecipe}
                  updateModalState={updateModalState}
                  modalState={modal}
                />
              </Route>
              <Route exact path="/settings">
                <Settings />
              </Route>
              <Route path="*">
                <h1>Page not found!</h1>
              </Route>
            </Switch>
          </div>
        </Main>
      </Layout>
    </Router>
  );
};

export default AppContainer;
