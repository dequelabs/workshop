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
  const labels = [];
  modal.find('.dqpl-label').forEach(label => {
    const text = label.text();
    expect(labels.includes(text)).toBeFalsy();
    labels.push(text);
  });
});

test('each delete button has a unique accessible name', () => {
  const modal = mount(<RecipeModal {...defaultProps} />);
  const names = [];
  modal.find('.RecipeModal__ingredient-delete').forEach(button => {
    const name = button.getDOMNode().getAttribute('aria-label');
    expect(names.includes(name)).toBeFalsy();
    names.push(name);
  });
});
