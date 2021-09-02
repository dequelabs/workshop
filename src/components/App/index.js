import React from 'react';
import PropTypes from 'prop-types';
import Stats from '../Stats';
import Recipes from '../Recipes';
import MainHeading from '../MainHeading';
import './index.css';

const App = ({
  recipes,
  stats,
  updateRecipe,
  updateModalState,
  modalState
}) => (
  <>
    <MainHeading>
      Recipe Dashboard <span>(with intentional a11y issues)</span>
    </MainHeading>
    <Stats stats={stats} />
    <Recipes
      recipes={recipes}
      updateRecipe={updateRecipe}
      updateModalState={updateModalState}
      modalState={modalState}
    />
  </>
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
