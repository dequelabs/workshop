import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon, TextField } from 'cauldron-react';
import './index.css';

/**
 * Renders a recipe item (an ingredient or instruction).
 * Renders a text field if edit is true, otherwise a list item.
 */
const RecipeModalItem = ({ edit, data, index, type, onDelete, ...other }) => {
  const Wrapper = edit ? 'div' : 'li';
  const text = type === 'instructions' ? 'Instruction' : 'Ingredient';
  return (
    <Wrapper className="RecipeModalItem">
      {edit ? (
        <Fragment>
          <TextField
            required
            multiline={type === 'instructions'}
            label={text}
            defaultValue={data}
            {...other}
          />
          <button
            type="button"
            className="RecipeModal__ingredient-delete"
            aria-label="trash can icon"
            onClick={() => onDelete(index, type)}
          >
            <Icon type="fa-trash" />
          </button>
        </Fragment>
      ) : (
        data
      )}
    </Wrapper>
  );
};

RecipeModalItem.propTypes = {
  edit: PropTypes.bool,
  data: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  type: PropTypes.string
};

RecipeModalItem.defaultProps = {
  edit: false,
  type: 'ingredient'
};
RecipeModalItem.displayName = 'RecipeModalItem';
export default RecipeModalItem;
