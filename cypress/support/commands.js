import 'cypress-real-events/support'
import '@4tw/cypress-drag-drop';


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

  //Cpmmand for Drag and Drop one to another
  Cypress.Commands.add(
    'dragAndDrop',
    (sourceSelector, targetSelector, options = {}) => {
      const timeout = options.timeout || 10000;
  
      // Scroll source into view
      cy.contains(sourceSelector, { timeout })
        .scrollIntoView()
        .should('be.visible')
        .as('source');
  
      // Scroll target into view
      cy.contains(targetSelector, { timeout })
        .scrollIntoView()
        .should('be.visible')
        .as('target');
  
      // Perform drag and drop
      cy.get('button').as('source');   // alias to capture it
cy.get('target').as('target');   // alias for target

      cy.get('@source').drag('@target', { force: true });
    }
  );
  