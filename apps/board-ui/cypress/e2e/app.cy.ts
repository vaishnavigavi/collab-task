describe('Collab Task Board', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the board title', () => {
    cy.get('h1').should('contain', 'Collab Task Board');
  });

  it('should have three columns', () => {
    cy.get('.kanban-column').should('have.length', 3);
  });

  it('should display theme toggle', () => {
    cy.get('.theme-toggle').should('be.visible');
  });
}); 