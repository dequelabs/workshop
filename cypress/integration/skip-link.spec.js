const { selectors } = JSON.parse(Cypress.env('CONFIG'));

describe('skip link', function() {
  let href;
  it('has a target', function() {
    cy.get(selectors.main).should('have.length', 1);
  });

  it('has a target with tabindex -1', function() {
    cy.get(selectors.main)
      .invoke('attr', 'tabindex')
      .should('equal', '-1');
  });

  it('links to target', function() {
    cy.get(selectors.main)
      .invoke('attr', 'id')
      .then(id => {
        href = `#${id}`;
        cy.get(selectors.link)
          .first()
          .invoke('attr', 'href')
          .should('have.equal', href);
      });
  });

  it('appears when focused', function() {
    cy.get(selectors.link)
      .filter(`[href='${href}']`)
      .focus()
      .should('be.visible');
  });
});
