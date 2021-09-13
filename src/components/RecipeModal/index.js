import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  TextField,
  Checkbox
} from 'cauldron-react';
import RecipeModalItem from '../RecipeModalItem';
import './index.css';

export default class RecipeModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    recipe: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onGreaseChange: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    setItemRef: PropTypes.func.isRequired,
    setWrapperRef: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    edit: PropTypes.bool
  };

  addIngredient = () => this.props.add('ingredients');
  addInstruction = () => this.props.add('instructions');
  renderItems = type => {
    const { errors, edit, recipe, setItemRef, onDelete } = this.props;
    return recipe[type].map((value, i) => (
      <RecipeModalItem
        key={`${recipe.name}:${value || `empty${i}`}`}
        error={errors[type].includes(i) ? 'Ingredient must not be empty' : null}
        edit={edit}
        index={i}
        data={value}
        type={type}
        fieldRef={input => {
          setItemRef(type, i, input);
        }}
        onDelete={onDelete}
      />
    ));
  };

  render() {
    const {
      errors,
      show,
      recipe,
      edit,
      onClose,
      setWrapperRef,
      onGreaseChange,
      validate
    } = this.props;
    const ingredientItems = this.renderItems('ingredients');
    const instructionItems = this.renderItems('instructions');

    return (
      <Modal
        show={show}
        heading={{
          text: `${edit ? 'Edit' : 'Cooking'} ${recipe.name}`
        }}
        onClose={onClose}
        className="RecipeModal"
      >
        <form onSubmit={validate}>
          <ModalContent>
            <h3 id="ingredients-heading">Ingredients</h3>
            <div
              className="RecipeModal__group"
              tabIndex={-1}
              ref={el => {
                setWrapperRef('ingredientsWrapper', el);
              }}
            >
              {edit ? (
                <div role="group" aria-labelledby="ingredients-heading">
                  {ingredientItems}
                </div>
              ) : (
                <ul aria-labelledby="ingredients-heading">{ingredientItems}</ul>
              )}
            </div>
            {edit && (
              <div className="RecipeModal__add-another">
                <button
                  type="button"
                  className="dqpl-link"
                  onClick={this.addIngredient}
                >
                  + Add another ingredient
                </button>
              </div>
            )}
            <h3 id="instructions-heading">Instructions</h3>
            <div
              className="RecipeModal__group"
              tabIndex={-1}
              ref={el => {
                setWrapperRef('instructionsWrapper', el);
              }}
            >
              {edit ? (
                <div role="group" aria-labelledby="instructions-heading">
                  {instructionItems}
                </div>
              ) : (
                <ol aria-labelledby="instructions-heading">
                  {instructionItems}
                </ol>
              )}
            </div>
            {edit ? (
              <div className="RecipeModal__add-another">
                <button
                  type="button"
                  className="dqpl-link"
                  onClick={this.addInstruction}
                >
                  + Add another instruction
                </button>
              </div>
            ) : (
              <div className="RecipeModal__global">
                <div className="dqpl-label">Rate the yumminess (0 - 50)</div>
                <TextField
                  label=" "
                  defaultValue={`${recipe.yumminess}`}
                  error={errors.yumminess ? 'Error!' : null}
                  type="number"
                  min="0"
                  max="50"
                  fieldRef={el => {
                    setWrapperRef('yumminess', el);
                  }}
                />
                <Checkbox
                  value="true"
                  id="grease-fire"
                  name="grease-fire"
                  label="I caused a grease fire making this"
                  onChange={onGreaseChange}
                />
              </div>
            )}
          </ModalContent>
          <ModalFooter>
            <Button
              type="submit"
              onClick={validate}
              disabled={
                !recipe.instructions.length && !recipe.ingredients.length
              }
            >
              {edit ? 'Save' : 'I cooked it'}
            </Button>
            <Button secondary onClick={onClose}>
              {edit ? 'Cancel' : 'Close'}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}
