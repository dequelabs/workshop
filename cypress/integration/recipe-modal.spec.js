const { selectors } = JSON.parse(Cypress.env('CONFIG'));

describe('recipe modal component', function() {
  it('opens by clicking a "Cook" button', function() {
    cy.get('.Recipes__card')
      .first()
      .then($el => {
        $el
          .find(selectors.button)
          .last()
          .click();
      });
    cy.get(selectors.dialog).should('have.length', 1);
  });
  it('gains focus when opened', function() {
    cy.focused().then($el => {
      const focused = $el[0];
      cy.get(selectors.dialog).then($el => {
        const dialog = $el[0];
        cy.wrap(dialog.contains(focused)).should('be.true');
      });
    });
  });
  it('traps focus', function() {
    cy.get(selectors.dialog).trapsFocus();
  });
  it('closes with "Escape" key', function() {
    const opts = {
      keyCode: 27,
      which: 27,
      code: 'Escape',
      key: 'Escape',
      bubbles: true
    };
    cy.focused().trigger('keydown', opts);
    cy.get(selectors.dialog).should('have.length', 0);
  });
});
