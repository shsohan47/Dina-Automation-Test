import BasePage from './BasePage';

class BasicRundown extends BasePage {
    /**
     * Selectors for rundown elements
     */
    selectors = {
        leftSideBarRoleTab: 'button[role="tab"]',
        editRundownTemplateContainer: '[role="menu"][aria-orientation="vertical"][data-state="open"]',
        createRundownTemplateDialog: 'div[role="dialog"][data-state="open"]',
        
        // 4-Panel Layout Selectors
        resourcePanel: '[data-panel-id="assets"]',
        readyPanel: '[data-panel-id="rundown-ready-list"]',
        preparingPanel: '[data-panel-id="rundown-preparing-list"]',
        editorPanel: '[data-panel-id="editor"]',
    };

    leftSideBarRundownClick() {
        return cy.get(this.selectors.leftSideBarRoleTab, { timeout: 15000 }).eq(8).click();
    }

    /**
     * Navigate to Edit Rundown Templates
     * This opens the More menu and clicks Edit Rundown Templates
     */
    navigateToEditRundownTemplates() {
        // Click More button
        cy.get('span[variant="h7"]')
            .contains('Rundowns')
            .should('exist')
            .parentsUntil('body')
            .find('button[aria-label="More"]')
            .click();
        
        // Navigate to Edit Rundown Templates
        cy.get(this.selectors.editRundownTemplateContainer)
            .should("exist")
            .then(($menu) => {
                // Find and click active organization if it exists
                const activeOrg = $menu.find(':contains("(Active Organization)")');
                if (activeOrg.length) {
                    cy.wrap(activeOrg)
                        .parents('[role="menuitemradio"]')
                        .click({ force: true });
                }
                // Click Edit Rundown Templates
                cy.wrap($menu)
                    .should('contain', 'Edit Rundown Templates')
                    .contains('Edit Rundown Templates')
                    .click();
            });
    }

    //Find the correct rundown template 
    findAndClickRundownTemplate(templateTitle){
        return cy.get('.MuiListItem-root[role="button"]')
            .contains(templateTitle)
            .scrollIntoView()
            .should('be.visible')
            .click()
    }

    /**
     * Get the rundown create template dialog
     */
    getRundownCreateTemplateDialog() {
        return cy.contains('h2', 'Create Rundown Template')
            .should('be.visible')
            .parents(this.selectors.createRundownTemplateDialog);
    }

    // ========== PANEL METHODS ==========

    /**
     * Get the Resources/Assets panel
     */
    getResourcePanel() {
        return cy.get(this.selectors.resourcePanel).should('be.visible');
    }

    /**
     * Get the Ready panel
     */
    getReadyPanel() {
        return cy.get(this.selectors.readyPanel).should('be.visible');
    }

    /**
     * Get the Preparing panel
     */
    getPreparingPanel() {
        return cy.get(this.selectors.preparingPanel).should('be.visible');
    }

    /**
     * Get the Editor panel
     */
    getEditorPanel() {
        return cy.get(this.selectors.editorPanel).should('be.visible');
    }

    /**
     * Verify all 4 panels are visible
     */
    verifyAllPanelsVisible() {
        cy.get(this.selectors.resourcePanel).should('be.visible');
        cy.get(this.selectors.readyPanel).should('be.visible');
        cy.get(this.selectors.preparingPanel).should('be.visible');
        cy.get(this.selectors.editorPanel).should('be.visible');
    }
    //expand rundown panel
    expandPanel(RundownPanelSelector){
        cy.get(RundownPanelSelector)
            .then($panel => {
                const expandBtn = $panel.find('button[aria-label="Expand"]');
                if (expandBtn.length > 0) {
                    cy.wrap(expandBtn).click();
                }
            })   
    }

    //collapse rundown panel
    collapsePanel(RundownPanelSelector) {
        cy.get(RundownPanelSelector)
            .then($panel => {
                // Pick up the minimize button if the panel is expanded
                const minimiseBtn = $panel.find('button[aria-label="Minimize"]');
                // This will make sure whether the panel is expand or collapse
                if (minimiseBtn.length > 0) {
                    cy.wrap(minimiseBtn).click();
                }
            })
    }
}

export default BasicRundown;