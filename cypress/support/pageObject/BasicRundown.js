export default class BasicRundown{
    selectors={
        LeftSideBarRoleTab:'button[role="tab"]',
    }

    leftSideBarRundownClick()
    {
       return cy.get(this.selectors.LeftSideBarRoleTab,{timeout:15000}).eq(8).click()
    }
    
}