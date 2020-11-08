
describe('Search Action', () => {
  it('Visit Page and search Star Wars Films', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Titre');

    cy.get('#searchInput')
    .type('Star Wars')
    .should('have.value', 'Star Wars');
    
    cy.get('.SearchBar').submit();
    
    cy.get('#tableDisplayButton')
    .click();

    cy.get('#gridDisplayButton')
    .click();
  });
});
