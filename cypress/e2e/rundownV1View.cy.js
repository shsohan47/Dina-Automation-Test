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
    })
    context("Muster Rundown Template Create Functionality",()=>
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
            .within(()=>
            {
                cy.contains('Edit Rundown Templates').click()
            })
            //That should open Rundown template container
            cy.get('span[variant="h7"]')
            .contains("Rundown Templates")
            .should('exist')

        })
        
    })
}
)