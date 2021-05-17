describe('recipe card component', function() {
  it('marks the image of recipe as decorative', function() {
    cy.get(`.Recipes__card`)
      .find('.Recipe__image')
      .then($el => {
        cy.wrap($el)
          .invoke('attr', 'alt')
          .should('equal', '');
      });
  });

  it('has a heading title', function() {
    cy.get(`.Recipes__card`)
      .find('.Heading')
      .then($el => {
        cy.wrap($el).accessibleName();
      });
  });

  it('has the cook time/prep time/difficulty table', function() {
    cy.get(`.Recipes__card`)
      .find('table')
      .then($el => {
        expect($el.first()).to.contain('Prep time');
        expect($el.first()).to.contain('Cook time');
        expect($el.first()).to.contain('Difficulty');
      });
  });

  it('has an "Edit" button', function() {
    cy.get(`.Recipes__card`).then($el => {
      cy.wrap($el)
        .find('.edit')
        .first()
        .accessibleName()
        .should('match', /^edit/i);
    });
  });

  it('has a "Cook" button', function() {
    cy.get(`.Recipes__card`).then($el => {
      cy.wrap($el)
        .find('.Recipes__card-foot button')
        .accessibleName()
        .should('match', /^cook/i);
    });
  });
});
