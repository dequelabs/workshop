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

  test('the ingredients group is labelled by the "Ingredients" heading', () => {
    const modal = mount(<RecipeModal {...defaultProps} />);
    const ingredientsGroup = modal.find('[role="group"]').at(0);

    expect(
      ingredientsGroup
        .getDOMNode()
        .getAttribute('aria-labelledby')
        .includes('ingredients-heading')
    ).toBe(true);
  });

  test('the instructions group is labelled by the "Instructions" heading', () => {
    const modal = mount(<RecipeModal {...defaultProps} />);
    const instructionsGroup = modal.find('[role="group"]').at(1);

    expect(
      instructionsGroup
        .getDOMNode()
        .getAttribute('aria-labelledby')
        .includes('instructions-heading')
    ).toBe(true);
  });

  test('handles errors', () => {
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

    ingredients.forEach((input, index) => {
      const node = input.getDOMNode();
      const shouldHaveError = errors.ingredients.includes(index);

      // erroneous fields
      if (shouldHaveError) {
        expect(handlesError(node)).toBe(true);
        return;
      }

      // non-erroneous fields
      expect(node.getAttribute('aria-invalid')).toBe('false');
    });

    instructions.forEach((textarea, index) => {
      const node = textarea.getDOMNode();
      const shouldHaveError = errors.instructions.includes(index);

      if (shouldHaveError) {
        expect(handlesError(node)).toBe(true);
        return;
      }

      expect(node.getAttribute('aria-invalid')).toBe('false');
    });
  });
});

describe('when not in "edit mode"', () => {
  test('the ingredients list is labelled by the "Ingredients" heading', () => {
    const modal = mount(<RecipeModal {...defaultProps} edit={false} />);
    expect(
      modal
        .find('.RecipeModal__group ul')
        .getDOMNode()
        .getAttribute('aria-labelledby')
        .includes('ingredients-heading')
    ).toBe(true);
  });

  test('the instructions ordered list is labelled by the "Instructions" heading', () => {
    const modal = mount(<RecipeModal {...defaultProps} edit={false} />);
    expect(
      modal
        .find('.RecipeModal__group ol')
        .getDOMNode()
        .getAttribute('aria-labelledby')
        .includes('instructions-heading')
    ).toBe(true);
  });
});
