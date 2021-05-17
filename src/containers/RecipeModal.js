import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeModal from '../components/RecipeModal';

const invalidYumminess = input => {
  const value = input && input.value.trim();
  const number = value && Number(value);
  return !value || isNaN(number) || number > 50 || number < 0;
};
const invalidRecipe = (input, inputs) => {
  const isEmpty = input && !input.value.trim();
  const isDuplicate = inputs.find(
    otherInput =>
      otherInput &&
      input &&
      otherInput !== input &&
      otherInput.value === input.value
  );

  return isEmpty || isDuplicate;
};
const defaultErrors = {
  ingredients: [],
  instructions: [],
  yumminess: false,
  insufficient: false
};

export default class RecipeModalContainer extends Component {
  static propTypes = {
    edit: PropTypes.bool,
    show: PropTypes.bool.isRequired,
    updateRecipe: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    recipe: PropTypes.object.isRequired
  };

  static defaultProps = {
    edit: false
  };

  constructor(props) {
    super(props);
    const { recipe } = this.props;
    this.state = {
      errors: defaultErrors,
      greaseChecked: false,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    };
  }

  submitSuccess = () => {
    const { edit, updateRecipe, onClose, recipe } = this.props;
    const resetErrors = { errors: defaultErrors };
    const recipeUpdates = edit
      ? {
          ingredients: this.ingredients.filter(i => i).map(ing => ing.value),
          instructions: this.instructions.filter(i => i).map(inst => inst.value)
        }
      : {
          yumminess: Number(this.yumminess.value.trim()),
          greaseFireCount:
            recipe.greaseFireCount + (this.state.greaseChecked ? 1 : 0),
          cookCount: recipe.cookCount + 1
        };
    const newState = edit ? { ...resetErrors, ...recipeUpdates } : resetErrors;
    this.setState(newState);
    updateRecipe(recipeUpdates);
    onClose();
  };

  validate = e => {
    e.preventDefault();
    const { edit } = this.props;
    const inputs = edit
      ? [...this.ingredients, ...this.instructions]
      : [this.yumminess];
    const erroneousInputs = inputs.filter(input => {
      return edit ? invalidRecipe(input, inputs) : invalidYumminess(input);
    });

    if (!erroneousInputs.length) {
      return this.submitSuccess();
    }

    const errors = edit
      ? erroneousInputs.reduce(
          (acc, val) => {
            const ingredientIndex = this.ingredients.indexOf(val);
            if (ingredientIndex > -1) {
              acc.ingredients.push(ingredientIndex);
            } else {
              acc.instructions.push(this.instructions.indexOf(val));
            }
            return acc;
          },
          {
            ingredients: [],
            instructions: []
          }
        )
      : {
          ...this.state.errors,
          yumminess: true
        };

    this.setState({ errors }, () => {
      erroneousInputs[0].focus();
    });
  };

  onGreaseChange = () => {
    this.setState({
      greaseChecked: !this.state.greaseChecked
    });
  };

  add = type => {
    this.setState(
      {
        [type]: this.state[type].concat('')
      },
      () => {
        const items = this[type];
        items[items.length - 1].focus();
      }
    );
  };

  onDelete = (index, type) => {
    const items = [...this.state[type]];
    const focusTarget =
      type === 'ingredients'
        ? this.ingredientsWrapper
        : this.instructionsWrapper;
    // remove the specified index from items
    items.splice(index, 1);
    this.setState({
      [type]: items
    });

    if (focusTarget) {
      focusTarget.focus();
    }
  };

  onClose = () => {
    const {
      recipe: { ingredients, instructions },
      onClose
    } = this.props;
    this.setState({
      ingredients,
      instructions,
      errors: defaultErrors,
      greaseChecked: false
    });
    onClose();
  };

  setItemRef = (type, index, el) => {
    this[type][index] = el;
  };

  setWrapperRef = (type, el) => {
    this[type] = el;
  };

  render() {
    // reset input ref arrays
    this.ingredients = [];
    this.instructions = [];
    const { show, edit, recipe } = this.props;
    const { errors, instructions, ingredients } = this.state;
    const recipeData = {
      ...recipe,
      instructions,
      ingredients
    };
    return (
      <RecipeModal
        edit={edit}
        recipe={recipeData}
        show={show}
        errors={errors}
        validate={this.validate}
        onDelete={this.onDelete}
        onClose={this.onClose}
        onGreaseChange={this.onGreaseChange}
        add={this.add}
        setItemRef={this.setItemRef}
        setWrapperRef={this.setWrapperRef}
      />
    );
  }
}
