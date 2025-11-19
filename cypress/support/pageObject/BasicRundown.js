import BasePage from './BasePage';

/**
 * BasicRundown - Page Object for Rundown functionality
 * @extends BasePage
 */
class BasicRundown extends BasePage {
    /**
     * Selectors for rundown elements
     */
    selectors = {
        leftSideBarRoleTab: 'button[role="tab"]',
        editRundownTemplateContainer: '[role="menu"][aria-orientation="vertical"][data-state="open"]',
        createRundownTemplateDialog: 'div[role="dialog"][data-state="open"]',
    };

    /**
     * Click on the Rundown tab in the left sidebar
     * @returns {Cypress.Chainable}
     */
    leftSideBarRundownClick() {
        return cy.get(this.selectors.leftSideBarRoleTab, { timeout: 15000 }).eq(8).click();
    }

    /**
     * Create a new group for rundown template
     * @returns {Cypress.Chainable}
     * @example
     * const rundown = new BasicRundown();
     * rundown.CreateNewGroupForRundownTemplate();
     */
    CreateNewGroupForRundownTemplate() {
        // Open the Rundown template container
        return cy.get('span[variant="h7"]')
            .contains('Rundown Templates')
            .should('exist')
            // This will traverse up to the parent div container of the Rundown template section
            .parents('div').eq(1)
            .within(() => {

                // Click "New Group" inside this container
                cy.contains('button', 'New Group').should('be.visible').dblclick();

                // Wait for the new group to appear and rename it
                cy.contains('Untitled', { timeout: 10000 })
                    .should('be.visible') // Wait for visibility instead of hard wait
                    .dblclick()
                    .type('Automated Rundown Template Group{enter}'); // press enter to confirm
            });
    }

    /**
     * Get the rundown create template dialog
     * @returns {Cypress.Chainable}
     */
    getRundownCreateTemplateDialog() {
        return cy.contains('h2', 'Create Rundown Template')
            .should('be.visible')
            .parents(this.selectors.createRundownTemplateDialog);
    }
}

export default BasicRundown;