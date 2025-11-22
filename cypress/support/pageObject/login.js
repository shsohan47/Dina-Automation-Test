import BasePage from './BasePage';

/**
 * LoginPage - Page Object for login functionality
 * @extends BasePage
 */
class LoginPage extends BasePage {
    /**
     * Selectors for login page elements
     */
    selectors = {
        username: ':nth-child(1) > .MuiFormControl-root > [data-testid="input"] > .MuiInputBase-input',
        password: ':nth-child(2) > .MuiFormControl-root > [data-testid="input"] > .MuiInputBase-input',
        loginButton: 'LOG IN',
        validation_username: ':nth-child(1) > .MuiFormControl-root > .MuiFormHelperText-root',
        validation_password: ':nth-child(2) > .MuiFormControl-root > .MuiFormHelperText-root',
        button: '.MuiButtonBase-root.MuiButton-root.MuiButton-text.css-i99cp8.Mui-disabled.Mui-disabled'
    };

    /**
     * Perform login action
     * @param {string} username - Username to login with
     * @param {string} password - Password to login with
     * @example
     * const loginPage = new LoginPage();
     * loginPage.login('testuser', 'password123');
     */
    login(username, password) {
        this.visit('/');
        this.type(this.selectors.username, username);
        this.type(this.selectors.password, password);
        this.findByText(this.selectors.loginButton).click({ force: true });
        cy.get('.MuiToolbar-root', { timeout: 15000 }).should('be.visible');
    }

    /**
     * Verify validation message for username field
     * @param {string} expectedMessage - Expected validation message
     */
    verifyUsernameValidation(expectedMessage) {
        this.shouldHaveText(this.selectors.validation_username, expectedMessage);
    }

    /**
     * Verify validation message for password field
     * @param {string} expectedMessage - Expected validation message
     */
    verifyPasswordValidation(expectedMessage) {
        this.shouldHaveText(this.selectors.validation_password, expectedMessage);
    }

    /**
     * Verify login button is disabled
     */
    verifyLoginButtonDisabled() {
        this.shouldBeDisabled(this.selectors.button);
    }
}

export default LoginPage;

