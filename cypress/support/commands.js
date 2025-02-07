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