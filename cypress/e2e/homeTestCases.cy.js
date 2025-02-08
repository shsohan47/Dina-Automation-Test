import NavigationBar from "../support/pageObject/NavigationBar"
import LoginPage from "../support/pageObject/login"
import Spaces from "../support/pageObject/Spaces"
describe("Dina Home Page - All Test Cases",()=>
{
    
    const navigationBarIcon = new NavigationBar()
    beforeEach(()=>
    {
        cy.session("login session",()=>
        {
            const loginPage = new LoginPage();
            loginPage.login(Cypress.env('username'),Cypress.env('password'));
            cy.get('.MuiToolbar-root', { timeout: 15000 }).should('be.visible');
            
        })
    })
    context('Navigation Bar Tests',()=>
    {
        
        it("should open the Home Space",()=>
        {
            cy.visit("/home", { failOnStatusCode: false });
            cy.get('.MuiToolbar-root',{timeout:15000}).should('be.visible').then(($element) => {
                expect($element).to.be.visible; // wait upto 10 sec
            });
            navigationBarIcon.getHomeIcon().click()
        });
        it("should show the tooltip when hover for Home",()=>
        {
            cy.visit("/");
            //tooltipchecker function
            cy.checkToolTipOnHover('.css-1diogi2','.css-lwihi1','Home');
        })

    })

    context("Home Spaces View Functionality", () => {
        const space = new Spaces();
        it("Test cases of creating a new Test View", () => {
          cy.visit("/");
      
          // Tooltip check on hover
          cy.checkToolTipOnHover('.css-11qfyq1 > svg', '.css-lwihi1', 'Create a new view');
      
         //create a new view
         space.createNewView('Automated Test View');
         //Verify the view was created
         space.verifyViewCreated('Automated Test View')
        });

        it("Test cases for edit Test view which was created with valid Title",()=>
        {
            cy.visit('/');
            //check valid View Title validation test case
            space.verifyEditFunction("Automated Test View","Automated Test View V1")
        })
        it('Test cases for edit Test view which was created with Invalid/empty Title',()=>
        {
            cy.visit('/');
            //check valid View Title validation test case
            space.verifyEditFunction("Automated Test View","")
        })
        it('should create a new view with a random title and add a widget',()=>
        {
            const randomTitle = space.generateRandomTitle();
            cy.visit('/');
            space.addYourFirstWidget(randomTitle);

        })
      });
      


})