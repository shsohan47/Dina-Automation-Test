import LoginPage from "../support/pageObject/login"
import BasicRundown from "../support/pageObject/BasicRundown"
import '@4tw/cypress-drag-drop'

describe("Rundown v2 View - All Test Cases", () => {
    beforeEach(() => {
        cy.session("login session", () => {
            const loginPage = new LoginPage();
            cy.log(Cypress.env('username'));
            loginPage.login(Cypress.env('username'), Cypress.env('password'));
        })
        cy.suppressBackgroundRequests();
    })

    context("Master Rundown Template Create Functionality", () => {
        it("should Work the Rundown Creation end to end From Master template", () => {
            const rundown = new BasicRundown();
            cy.visit('/')
            rundown.leftSideBarRundownClick();
            //This will check the rundown list and open the edit master rundown template based on ORG or non ORG
            rundown.navigateToEditRundownTemplates();

            //CREATE A NEW TEMPLATE INSIDE THE GROUP
            cy.contains('button', 'New Template').should('be.visible').click();
            // create rundown template dialog should appear
            rundown.getRundownCreateTemplateDialog().within(() => {
                //This will test only Tv Rundown 
                cy.contains('label', 'Tv').should("exist").click();
                cy.get('input[placeholder="Type title here..."]').should('be.visible').type("Automated Test Rundown Template v2");
                cy.contains('button', 'Create').should('be.visible').click();
            })

            //close the rundown tab
            rundown.leftSideBarRundownClick()

            //First of all switch to Rundown v2
            rundown.switchToRundownV2();
            //Modify the master rundown template
            //first check all panel is workign or not (resource, preparing, ready, Editor)
            rundown.verifyAllPanelsVisible();
            //Now check all the information in header is visible or not



        })

        // it('should work End to End testing of master Rundown Editing',()=>
        // {
        //     const rundown = new BasicRundown();
        // const resourcePanel = rundown.selectors.resourcePanel
        // const editorPanel = rundown.selectors.editorPanel
        // cy.visit('/');
        // rundown.leftSideBarRundownClick();
        // rundown.navigateToEditRundownTemplates();
        // //Get the right template and click on it
        // rundown.findAndClickRundownTemplate("Automated Test Rundown Template v2");
        // cy.wait(5000)
        // //close the Rundown Tab
        // rundown.leftSideBarRundownClick()
        // //collaps resource and editor panel
        // rundown.collapsePanel(resourcePanel);
        // rundown.collapsePanel(editorPanel);
        // })

    })

    after('Will delete the Rundown everytime for clean up the stack', () => {
        const rundown = new BasicRundown();
        const resourcePanel = rundown.selectors.resourcePanel
        const editorPanel = rundown.selectors.editorPanel
        cy.visit('/');
        rundown.leftSideBarRundownClick();
        rundown.navigateToEditRundownTemplates();
        //Get the right template and click on it
        rundown.findAndClickRundownTemplate("Automated Test Rundown Template v2");
        cy.wait(5000)
        //close the Rundown Tab
        rundown.leftSideBarRundownClick()
        //collaps resource and editor panel
        rundown.collapsePanel(resourcePanel);
        rundown.collapsePanel(editorPanel);
        // TODO: Delete the template and group
        // Open more options (scoped example)
        cy.get('[aria-haspopup="menu"]').eq(3).click()

        //  Menu should be visible
        cy.findByRole('menu').should('be.visible')

        // Click Archive from menu
        cy.findByRole('menu')
            .findByRole('menuitem', { name: 'Archive Archive the rundown template' })
            .click()

        // Confirmation dialog appears
        cy.findByRole('dialog').should('be.visible')

        //  Confirm Archive
        cy.findByRole('dialog')
            .findByRole('button', { name: 'Archive' })
            .click()

        //I need to go to rundown header and archive from there...To be continue
    })
})
