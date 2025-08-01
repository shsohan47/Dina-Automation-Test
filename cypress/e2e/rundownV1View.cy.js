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
        })
        
    })
}
)