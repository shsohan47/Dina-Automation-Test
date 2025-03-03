class widgets {
    //All widget selectors
    collapseButton = '.css-qk8wrb';
    collapseMenu = '.css-1rg5ffj';
    expandbutton = '.css-14o9bhr'
    widgetTitle = '.css-rn2juv-HeaderTitle';
    widgetTitleInputField = 'input[name="header-input"]'
    widgetMenu = '.css-kjyztd > :nth-child(1) > .Button';
    dateFilter = '.css-2gyawf > .Button';
    searchInputField = '.css-1wasr6r';
    widgetFilter = '.css-k2bwbd-PropsIconContainer > .css-qk8wrb';
    widgetMoreButton = '.css-1kgy35r';


    //For Edit Title of the Widget
    doubleClickToeditWidgetTitle(editTitleName)
    {
        cy.get(this.widgetTitle).dblclick()
        cy.get(this.widgetTitleInputField).clear().type(editTitleName).type('{enter}')
        cy.get(this.widgetTitle).should("have.text",editTitleName);
    }
//This will check weather collapse button trigger and collapse the widget properly or not
    checkExpandCollapseMenu()
    {
        cy.get(this.collapseButton).eq(0).click();
        cy.get(this.collapseMenu).should('be.visible').invoke("outerWidth").should('eq',40)
        cy.get(this.collapseMenu).should('be.visible').invoke('outerHeight').should('eq',522.609375);
        cy.get(this.expandbutton).click();
}
}
export default widgets