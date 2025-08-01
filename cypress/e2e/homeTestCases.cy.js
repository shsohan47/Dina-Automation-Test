import NavigationBar from "../support/pageObject/NavigationBar"
import LoginPage from "../support/pageObject/login"
import Spaces from "../support/pageObject/Spaces"
import widgets from "../support/pageObject/widgets"
describe("Dina Home Page - All Test Cases",()=>
{
    let randomTitleForSpace;
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
            //cy.checkToolTipOnHover('.css-1diogi2','.css-lwihi1','Home');
            cy.checkToolTipOnHover('[data-state="closed"] .skipOverride', '[role="tooltip"]', 'Home');

        })

    })

    context("Home Spaces View Functionality", () => {
        const space = new Spaces();

        it("should create a new view successfully", () => {

          cy.visit("/");
      
         //create a new view
         space.createNewView('Automated Test View');
         //Verify the view was created
         space.verifyViewCreated('Automated Test View')
        });

        it.only("Test cases for edit Test view which was created with valid Title",()=>
        {
            cy.visit('/');
            //check valid View Title validation test case
            space.verifyEditFunction("Automated Test View","Automated Test View V1");
            space.verifyDeleteFunction('Automated Test View V1');

        })
        it('Test cases for edit Test view which was created with Invalid/empty Title',()=>
        {
            cy.visit('/');
            //check valid View Title validation test case
            space.verifyEditFunction("Automated Test View","")
        })
        it('should create a new view with a random title and add a widget than delete it',()=>
        {
            randomTitleForSpace = space.generateRandomTitle();
            cy.visit('/');
            space.addYourFirstWidget(randomTitleForSpace);
            // space.verifyDeleteFunction(randomTitle);
            // cy.get(space.createdViewsList).should('not.contain',randomTitle);


        })
        context("Will test each widget functionality",()=>
        {
            const widget = new widgets()
            context("All test cases for Feeds widgets",()=>
            {
                it("should allow the user to edit the title of Feeds Widget",()=>
                    {
                       randomTitleForSpace = space.generateRandomTitle();
                        
                        cy.visit('/')
                        space.addYourFirstWidget(randomTitleForSpace);
                        widget.checkExpandCollapseMenu()
                        cy.get('.css-1hth4v0-Header').within(()=>
                        {
                            widget.doubleClickToeditWidgetTitle("This is Automated Feed Widget Title")
                        })
                    })
             
            })
        })
        afterEach("Delete the View everytime after each test case",()=>
        {
            if(randomTitleForSpace)
        
            {
                    space.verifyDeleteFunction(randomTitleForSpace);
            }
            
            else{
                cy.log("No view to delete, for now skipping deletion")
            }
            
        }
    )
    
      });
      


})