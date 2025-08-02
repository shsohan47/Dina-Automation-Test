import 'cypress-real-events/support'

//Command for check Tooltip
Cypress.Commands.add('checkToolTipOnHover',(elementSelector,tooltipSelector,expectedText)=>
{
    //cy.wait(2000)
    cy.get(elementSelector,{timeout:15000})
    .realHover();
    
    cy.get(tooltipSelector)
    .should('be.visible')
    .and('contain',expectedText)
});

//Command for filtering extra request
Cypress.Commands.add('suppressBackgroundRequests', () => {
    const backgroundPatterns = [
      '**/background-polling/**',
      '**/analytics/**',
      '**/session-check/**',
      '**/some-repeated-fetch/**'
    ];
  
    backgroundPatterns.forEach((pattern) => {
      cy.intercept('GET', pattern, { statusCode: 200, body: {} }).as('bg');
    });
  });
  