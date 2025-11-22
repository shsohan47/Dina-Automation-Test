import { TIMEOUTS } from '../constants';

/**
 * Base Page Object class
 * Provides common methods for all page objects to reduce code duplication
 */
class BasePage {
    /**
     * Visit a URL relative to the base URL
     * @param {string} path - The path to visit (e.g., '/', '/home')
     * @param {object} options - Cypress visit options
     */
    visit(path = '/', options = {}) {
        cy.visit(path, { failOnStatusCode: false, ...options });
    }

    /**
     * Get an element with default timeout
     * @param {string} selector - CSS selector or data-testid
     * @param {object} options - Cypress get options
     * @returns {Cypress.Chainable}
     */
    getElement(selector, options = {}) {
        return cy.get(selector, { timeout: TIMEOUTS.DEFAULT, ...options });
    }

    /**
     * Click an element
     * @param {string} selector - CSS selector
     * @param {object} options - Cypress click options
     */
    click(selector, options = {}) {
        this.getElement(selector).click(options);
    }

    /**
     * Type text into an input field
     * @param {string} selector - CSS selector
     * @param {string} text - Text to type
     * @param {object} options - Cypress type options
     */
    type(selector, text, options = {}) {
        this.getElement(selector).type(text, options);
    }

    /**
     * Clear and type text into an input field
     * @param {string} selector - CSS selector
     * @param {string} text - Text to type
     */
    clearAndType(selector, text) {
        this.getElement(selector).clear().type(text);
    }

    /**
     * Wait for an element to be visible
     * @param {string} selector - CSS selector
     * @param {number} timeout - Custom timeout in milliseconds
     */
    waitForVisible(selector, timeout = TIMEOUTS.DEFAULT) {
        cy.get(selector, { timeout }).should('be.visible');
    }

    /**
     * Wait for an element to not exist
     * @param {string} selector - CSS selector
     * @param {number} timeout - Custom timeout in milliseconds
     */
    waitForNotExist(selector, timeout = TIMEOUTS.DEFAULT) {
        cy.get(selector, { timeout }).should('not.exist');
    }

    /**
     * Check if element contains text
     * @param {string} selector - CSS selector
     * @param {string} text - Expected text
     */
    shouldContainText(selector, text) {
        this.getElement(selector).should('contain', text);
    }

    /**
     * Check if element has exact text
     * @param {string} selector - CSS selector
     * @param {string} text - Expected text
     */
    shouldHaveText(selector, text) {
        this.getElement(selector).should('have.text', text);
    }

    /**
     * Right-click on an element
     * @param {string} selector - CSS selector
     */
    rightClick(selector) {
        this.getElement(selector).rightclick();
    }

    /**
     * Double-click on an element
     * @param {string} selector - CSS selector
     */
    doubleClick(selector) {
        this.getElement(selector).dblclick();
    }

    /**
     * Find element by text content
     * @param {string} text - Text to search for
     * @param {object} options - Cypress contains options
     * @returns {Cypress.Chainable}
     */
    findByText(text, options = {}) {
        return cy.contains(text, { timeout: TIMEOUTS.DEFAULT, ...options });
    }

    /**
     * Check if element is disabled
     * @param {string} selector - CSS selector
     */
    shouldBeDisabled(selector) {
        this.getElement(selector).should('be.disabled');
    }

    /**
     * Check if element is enabled
     * @param {string} selector - CSS selector
     */
    shouldBeEnabled(selector) {
        this.getElement(selector).should('not.be.disabled');
    }
}

export default BasePage;
