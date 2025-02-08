export default class LoginPage {
    selectors = {
        username: ':nth-child(1) > .MuiFormControl-root > [data-testid="input"] > .MuiInputBase-input',
        password: ':nth-child(2) > .MuiFormControl-root > [data-testid="input"] > .MuiInputBase-input',
        loginButton: 'LOG IN',
        valdation_username:':nth-child(1) > .MuiFormControl-root > .MuiFormHelperText-root',
        valdation_password:':nth-child(2) > .MuiFormControl-root > .MuiFormHelperText-root',
        Button: ".MuiButtonBase-root.MuiButton-root.MuiButton-text.css-i99cp8.Mui-disabled.Mui-disabled"
        
    };

    login(username, password) {
        cy.visit("/"); // Ensure the URL is correct
        cy.get(this.selectors.username).type(username); // Type username
        cy.get(this.selectors.password).type(password); // Type password
        cy.contains(this.selectors.loginButton).click({ force: true }); // Click login button
        // You might want to add assertions here to confirm successful login
    }
}
