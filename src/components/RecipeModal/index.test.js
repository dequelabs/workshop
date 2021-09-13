import React from 'react';
import { mount } from 'enzyme';
import RecipeModal from './';
import data from '../../data';

const noop = () => {};
const defaultProps = {
  show: true,
  recipe: data[0],
  onClose: noop,
  onDelete: noop,
  onGreaseChange: noop,
  validate: noop,
  add: noop,
  setItemRef: noop,
  setWrapperRef: noop,
  errors: {
    instructions: [],
    ingredients: []
  },
  edit: true
};

test('each text field has a unique accessible label', () => {
  const modal = mount(<RecipeModal {...defaultProps} />);
  const groups = modal.find('.RecipeModal__group');
  const ingredientsGroup = groups.at(0);
  const instructionsGroup = groups.at(1);

  ingredientsGroup
    .find('.dqpl-label > span:first-child')
    .forEach((label, index) => {
      expect(label.text()).toBe(`Ingredient ${index + 1}`);
    });

  instructionsGroup
    .find('.dqpl-label > span:first-child')
    .forEach((label, index) => {
      expect(label.text()).toBe(`Instruction ${index + 1}`);
    });
});

test('each delete button has a unique accessible name', () => {
  const modal = mount(<RecipeModal {...defaultProps} />);
  const groups = modal.find('.RecipeModal__group');
  const ingredientsGroup = groups.at(0);
  const instructionsGroup = groups.at(1);

  ingredientsGroup
    .find('.RecipeModal__ingredient-delete')
    .forEach((button, index) => {
      const name = button.getDOMNode().getAttribute('aria-label');
      expect(name).toBe(`Delete Ingredient ${index + 1}`);
    });

  instructionsGroup
    .find('.RecipeModal__ingredient-delete')
    .forEach((button, index) => {
      const name = button.getDOMNode().getAttribute('aria-label');
      expect(name).toBe(`Delete Instruction ${index + 1}`);
    });
});

describe('when in "edit mode"', () => {
  // eslint-disable-next-line no-unused-vars
  const handlesError = node => {
    return (
      node.getAttribute('aria-invalid') === 'true' &&
      node.getAttribute('aria-describedby').includes(node.nextElementSibling.id)
    );
  };
  test.todo('the ingredients group is labelled by the "Ingredients" heading');
  test.todo('the instructions group is labelled by the "Instructions" heading');

  test.skip('handles errors', () => {
    const errors = {
      // the 1st ingredient is empty
      ingredients: [0],
      // the 2nd instruction is empty
      instructions: [1]
    };
    const modal = mount(<RecipeModal {...defaultProps} errors={errors} />);
    const ingredients = modal.find('input');
    const instructions = modal.find('textarea');

    expect(ingredients.length).toBe(defaultProps.recipe.ingredients.length);
    expect(instructions.length).toBe(defaultProps.recipe.instructions.length);

    // TODO: test that for each invalid (erroneous) instruction / ingredient we:
    // - set `aria-invalid=true`
    // - associate the field with its error message via `aria-describedby`
    //
    // hint: see `handlesError` function above
  });
});

describe('when not in "edit mode"', () => {
  test.todo('the ingredients list is labelled by the "Ingredients" heading');
  test.todo(
    'the instructions ordered list is labelled by the "Instructions" heading'
  );
});
