import LoginPage from "../support/pageObject/login"
import BasicRundown from "../support/pageObject/BasicRundown"

describe("Rundown v1 View - All Test Cases",()=>
{
    beforeEach(()=>{
        cy.session("login session",()=>
        {
            const loginPage = new LoginPage();
            loginPage.login(Cypress.env('username'),Cypress.env('password'));
            

        })
        cy.suppressBackgroundRequests();
    })
    context("Master Rundown Template Create Functionality",()=>
    {
        it("should click the left side rundown button and show rundown tabs",()=>
        {
            const rundown = new BasicRundown();
            cy.visit('/')
            rundown.leftSideBarRundownClick();
            //check the button open the rundown bar and click more option
            cy.get('span[variant="h7"]')
            .contains('Rundowns')
            .should('exist')
            .parentsUntil('body')
            .find('button[aria-label="More"]')
            .click()
            //That should open the Edit temnplate container
            cy.get(rundown.selectors.EditRundownTemplateContainer)
            .should("exist")
            .then(($menu)=>
            {
                //finding the right Organization which is currentlyactive
                const activeOrg = $menu.find(':contains("(Active Organization)")');
                //check weather the user have any Organization in their system or not
                //if yes click on the active org radio menu button
                //if not skip it
                if(activeOrg.length)
                {
                    cy.wrap(activeOrg)
                    .parents('[role="menuitemradio"]')
                    .click({force:true})
                }
                //click on the Edit rundown template button
                cy.wrap($menu)
                .should('contain','Edit Rundown Templates')
                .contains('Edit Rundown Templates')
                .click();
            })
            
            //That should open Rundown template container
            cy.get('span[variant="h7"]')
            .contains("Rundown Templates")
            .should('exist')

            //make a new automated group
            cy.contains('button', 'New Group').should('be.visible').click();
            cy.find('Untitled').dblclick()
            .type("Automated Rundown template Group")
            

        })
        
    })
}
)