const { selectors } = JSON.parse(Cypress.env('CONFIG'));

describe('stat component', function() {
  it('has a presentational image', function() {
    cy.get('.Stat')
      .find(selectors.image)
      .then($el => {
        cy.wrap($el)
          .invoke('attr', 'alt')
          .should('equal', '');
      });
  });
});
