const { selectors } = JSON.parse(Cypress.env('CONFIG'));

describe('Recipe Dashboard page', function() {
  it('has the correct heading and title', function() {
    // TIP: use case-insensitive regexp because CSS can change case
    const title = /Recipe Dashboard/i;
    cy.title().should('match', title);

    const $h1 = cy.get(selectors.h1);
    $h1.should('have.length', 1);
    $h1.accessibleName().should('match', title);
  });
});
