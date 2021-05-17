import React from 'react';
import { mount } from 'enzyme';
import RecipeModalContainer from './RecipeModal';
import data from '../data';

const noop = () => {};
const e = {
  preventDefault: noop
};
const defaultProps = {
  show: true,
  recipe: data[0],
  updateRecipe: noop,
  onClose: noop,
  edit: true
};
const createInput = value => {
  const input = document.createElement('input');
  input.value = value;
  return input;
};
const ingredients = [
  createInput(''),
  createInput('Foo'),
  createInput('Bar'),
  createInput('')
];
const instructions = [createInput(''), createInput('Baz'), createInput('')];

const mountWrapper = overrides => {
  const wrapper = mount(
    <RecipeModalContainer {...defaultProps} {...overrides} />
  );
  wrapper.instance().ingredients = ingredients;
  wrapper.instance().instructions = instructions;
  return wrapper;
};

test('Edit mode - handles validation errors', () => {
  const wrapper = mountWrapper();
  wrapper.instance().validate(e);
  const errors = wrapper.state('errors');
  expect(errors).toEqual({
    ingredients: [0, 3],
    instructions: [0, 2]
  });
  expect(document.activeElement).toBe(ingredients[0]);
});

test('Edit mode - handles successful form submission', () => {
  const updateRecipe = jest.fn();
  const onClose = jest.fn();
  const wrapper = mountWrapper({
    updateRecipe,
    onClose
  });
  wrapper.setState({
    errors: {
      ingredients: [1, 2, 3],
      instructions: [0]
    }
  });
  // ensure all inputs have values
  [
    ...wrapper.instance().ingredients,
    ...wrapper.instance().instructions
  ].forEach((input, i) => {
    input.value = `value ${i}`;
  });
  wrapper.instance().validate(e);
  expect(wrapper.state('errors').ingredients).toEqual([]);
  expect(wrapper.state('errors').instructions).toEqual([]);
  expect(updateRecipe).toHaveBeenCalled();
  expect(onClose).toHaveBeenCalled();
});
