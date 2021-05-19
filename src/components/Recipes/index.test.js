import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Recipes from './';
import recipes from '../../data';

const getProps = overrides => ({
  recipes,
  updateRecipe: sinon.spy(),
  updateModalState: sinon.spy(),
  modalState: {
    edit: true,
    view: recipes[0].name
  },
  ...overrides
});

test("clicking edit updates 'edit' modal state with clicked recipe name", () => {
  const props = getProps();
  const wrapper = mount(<Recipes {...props} />);

  wrapper
    .find('.Recipes__card-edit')
    .at(1)
    .simulate('click');
  expect(
    props.updateModalState.calledWith({
      edit: recipes[1].name
    })
  ).toBe(true);
});

test('renders tables with prep time, cook time and difficulty', () => {
  const props = getProps();
  const wrapper = mount(<Recipes {...props} />);
  const tables = wrapper.find('table');

  expect(tables.length).toBe(recipes.length);

  recipes.forEach((recipe, index) => {
    const table = tables.at(index);
    const rows = table.find('tr');

    expect(rows.length).toBe(3);

    const prepTime = rows.at(0);
    const cookTime = rows.at(1);
    const difficulty = rows.at(2);

    expect(prepTime.find('th').text()).toBe('Prep time');
    expect(prepTime.find('td').text()).toBe(recipe.prepTime);

    expect(cookTime.find('th').text()).toBe('Cook time');
    expect(cookTime.find('td').text()).toBe(recipe.cookTime);

    expect(difficulty.find('th').text()).toBe('Difficulty');
    expect(difficulty.find('td').text()).toBe(recipe.difficulty);
  });
});

test("clicking cook updates 'view' modal state with clicked recipe name", () => {
  const props = getProps();
  const wrapper = mount(<Recipes {...props} />);

  wrapper
    .find('.Recipes__card-cook')
    .at(0)
    .simulate('click');

  expect(
    props.updateModalState.calledWith({
      view: recipes[0].name
    })
  ).toBe(true);
});

test('closing edit modal clears the "edit" modal state', () => {
  const props = getProps();
  const wrapper = mount(<Recipes {...props} />);

  const onClose = wrapper
    .find('RecipeModal')
    .at(0)
    .prop('onClose');
  onClose();

  expect(
    props.updateModalState.calledWith({
      edit: null
    })
  ).toBe(true);
});

test('closing view modal clears the "view" modal state', () => {
  const props = getProps();
  const wrapper = mount(<Recipes {...props} />);

  const onClose = wrapper
    .find('RecipeModal')
    .at(1)
    .prop('onClose');
  onClose();

  expect(
    props.updateModalState.calledWith({
      view: null
    })
  ).toBe(true);
});

test('The edit control is marked up as a semantic button', () => {
  const props = getProps();
  const wrapper = mount(<Recipes {...props} />);
  // prove that the edit control is a semantic HTML button element!
  expect(wrapper.find('button.Recipes__card-edit').exists()).toBe(true);
});

test('The edit control has a unique accessible name', () => {
  const props = getProps();
  const wrapper = mount(<Recipes {...props} />);
  const editImages = wrapper.find('.Recipes__card-edit img');

  recipes.forEach(({ name }, i) => {
    expect(
      editImages
        .at(i)
        .getDOMNode()
        .getAttribute('alt')
    ).toBe(`Edit ${name}`);
  });
});
