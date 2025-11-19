import LoginPage from "../support/pageObject/login"
import BasicRundown from "../support/pageObject/BasicRundown"
import '@4tw/cypress-drag-drop'

describe("Rundown v1 View - All Test Cases", () => {
    beforeEach(() => {
        cy.session("login session", () => {
            const loginPage = new LoginPage();
            cy.log(Cypress.env('username'));
            loginPage.login(Cypress.env('username'), Cypress.env('password'));


        })
        cy.suppressBackgroundRequests();
    })
    context("Master Rundown Template Create Functionality", () => {
        it("should Work the Rundown Creation end to end Functionality", () => {
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
            //That should open the Edit template container
            cy.get(rundown.selectors.editRundownTemplateContainer)
                .should("exist")
                .then(($menu) => {
                    //finding the right Organization which is currentlyactive
                    const activeOrg = $menu.find(':contains("(Active Organization)")');
                    //check weather the user have any Organization in their system or not
                    //if yes click on the active org radio menu button
                    //if not skip it
                    if (activeOrg.length) {
                        cy.wrap(activeOrg)
                            .parents('[role="menuitemradio"]')
                            .click({ force: true })
                    }
                    //click on the Edit rundown template button
                    cy.wrap($menu)
                        .should('contain', 'Edit Rundown Templates')
                        .contains('Edit Rundown Templates')
                        .click();
                })
            //CREATE A NEW GROUP FIRST
            rundown.CreateNewGroupForRundownTemplate()

            //CREATE A NEW TEMPLATE INSIDE THE GROUP
            cy.contains('button', 'New Template').should('be.visible').click();
            // create rundown template dialog should appear
            rundown.getRundownCreateTemplateDialog().within(() => {
                cy.contains('label', 'Tv').should("exist").click();
                cy.get('input[placeholder="Type title here..."]').should('be.visible').type("Automated Test Rundown Template v1");
                cy.contains('button', 'Create').should('be.visible').click();
            })
            //verify the template was created inside the group... To be continued...


        })

    })
    after(() => {
        //will delete the group and the rundown from the template
    })
}
)