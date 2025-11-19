export default class BasicRundown{
    selectors={
        LeftSideBarRoleTab:'button[role="tab"]',
        EditRundownTemplateContainer:'[role="menu"][aria-orientation="vertical"][data-state="open"]',
        CreateRundownTemplateDialog:'div[role="dialog"][data-state="open"]',
     
    }

    leftSideBarRundownClick()
    {
       return cy.get(this.selectors.LeftSideBarRoleTab,{timeout:15000}).eq(8).click()
    }

    CreateNewGroupForRundownTemplate()
    {
        // Open the Rundown template container
       return cy.get('span[variant="h7"]')
        .contains("Rundown Templates")
        .should('exist')
        //this will traverse up to the parent div container of the Rundown template section
        .parents('div').eq(1)
        .within(() => {
            cy.wait(2000);
        // Click "New Group" inside this container
        cy.contains('button', 'New Group').should('be.visible').click();

        // Wait for the new group to appear and rename it
        cy.contains('Untitled', { timeout: 10000 })
        .dblclick()
        .type("Automated Rundown Template Group{enter}"); // press enter to confirm

    });

    }
    getRundownCreateTemplateDialog()
    {
        return cy.contains("h2","Create Rundown Template").should('be.visible')
                .parents(this.selectors.CreateRundownTemplateDialog);
    }
    
    
}