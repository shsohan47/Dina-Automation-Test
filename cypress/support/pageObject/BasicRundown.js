export default class BasicRundown{
    selectors={
        LeftSideBarRoleTab:'button[role="tab"]',
        EditRundownTemplateContainer:'[role="menu"][aria-orientation="vertical"][data-state="open"]'
    }

    leftSideBarRundownClick()
    {
       return cy.get(this.selectors.LeftSideBarRoleTab,{timeout:15000}).eq(8).click()
    }
    
    
}