import LoginPage from "../support/pageObject/login";
describe('For all Login test cases', () => {
  it('Valid Login functionality', () => {
    const loginPage = new LoginPage();
    loginPage.login(Cypress.env('username'),Cypress.env('password'));
    // Wait for the toolbar element to appear
    cy.get('.MuiToolbar-root',{timeout:10000}).should('be.visible').then(($element) => {
      expect($element).to.be.visible; // wait upto 10 sec
  });
  });

  it("Invalid Login functionality",()=>
  {
    const loginPage = new LoginPage();
    loginPage.login("invalid","InvalidPassword");
    cy.get(loginPage.selectors.valdation_username).should('have.text',"User does not exist.");
    cy.get(loginPage.selectors.valdation_password).should('have.text',"User does not exist.");

  });
  it("Incorrect credential message",()=>
  {
    const loginPage = new LoginPage();
    loginPage.login("Sohan","InvalidPassword");
    cy.get(loginPage.selectors.valdation_username).should('have.text','Incorrect username or password.');
    cy.get(loginPage.selectors.valdation_password).should('have.text','Incorrect username or password.');
  })
  it("Empty Field Validation",()=>
  {
    const loginPage = new LoginPage();
    cy.visit("/")
    cy.get(loginPage.selectors.Button).should('be.disabled');
  })
  
  })