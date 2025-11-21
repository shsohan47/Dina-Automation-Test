import BasePage from './BasePage';
class BasicRundown extends BasePage {
    /**
     * Selectors for rundown elements
     */
    selectors = {
        leftSideBarRoleTab: 'button[role="tab"]',
        editRundownTemplateContainer: '[role="menu"][aria-orientation="vertical"][data-state="open"]',
        createRundownTemplateDialog: 'div[role="dialog"][data-state="open"]',
    };

    leftSideBarRundownClick() {
        return cy.get(this.selectors.leftSideBarRoleTab, { timeout: 15000 }).eq(8).click();
    }

    /**
     * Create a new group for rundown template
    
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
                cy.contains('button', 'New Group').should('be.visible').click();

                // Wait for the new group to appear and rename it
                cy.contains('Untitled', { timeout: 10000 })
                    .should('be.visible') // Wait for visibility instead of hard wait
                    .dblclick()
                    .type('Automated Rundown Template Group{enter}'); // press enter to confirm
            });
    }

    /**
     * Get the rundown create template dialog
     */
    getRundownCreateTemplateDialog() {
        return cy.contains('h2', 'Create Rundown Template')
            .should('be.visible')
            .parents(this.selectors.createRundownTemplateDialog);
    }
}

export default BasicRundown;