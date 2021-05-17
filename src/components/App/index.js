import React from 'react';
import PropTypes from 'prop-types';
import { Main, SkipLink, Layout } from 'cauldron-react';
import Stats from '../Stats';
import Recipes from '../Recipes';
import logo from '../../img/icons/logo.svg';
import './index.css';

const App = ({
  recipes,
  stats,
  updateRecipe,
  updateModalState,
  modalState
}) => (
  <div className="App">
    {!modalState.view && !modalState.edit && (
      <SkipLink target={'#main-content'} />
    )}
    <div className="dqpl-top-bar" role="banner">
      <ul role="menubar">
        <li
          tabIndex={!modalState.view && !modalState.edit ? 0 : -1}
          role="menuitem"
        >
          <img alt="" role="presentation" src={logo} />
          <span>awesome recipes</span>
        </li>
      </ul>
    </div>
    <Layout>
      <Main id="main-content" aria-labelledby="main-heading" tabIndex={-1}>
        <div className="App__head">
          <div className="confined">
            <h1 id="main-heading">
              Recipe Dashboard <span>(with intentional a11y issues)</span>
            </h1>
          </div>
        </div>
        <Stats stats={stats} />
        <Recipes
          recipes={recipes}
          updateRecipe={updateRecipe}
          updateModalState={updateModalState}
          modalState={modalState}
        />
      </Main>
    </Layout>
  </div>
);

App.propTypes = {
  updateRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.array.isRequired,
  stats: PropTypes.array.isRequired,
  updateModalState: PropTypes.func.isRequired,
  modalState: PropTypes.object.isRequired
};
App.displayName = 'App';
export default App;
