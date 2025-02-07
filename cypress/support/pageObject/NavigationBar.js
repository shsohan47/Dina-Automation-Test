export default class NavigationBar{
    selectors = {
        NavigationBarIcon : '.skipOverride',
    }

    getHomeIcon()
    {
        return cy.get(this.selectors.NavigationBarIcon).eq(0);
    }
    getFeedsIcon()
    {
        return cy.get(this.selectors.NavigationBarIcon).eq(1);
    }

    getStoryHubV1Icon()
    {
        return cy.get(this.selectors.NavigationBarIcon).eq(2);
    }
    getStoryHubV2Icon()
    {
        return cy.get(this.selectors.NavigationBarIcon).eq(3);
    }
    getMapsIcon()
    {
        return cy.get(this.selectors.NavigationBarIcon).eq(4);
    }
}