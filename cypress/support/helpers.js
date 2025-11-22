/**
 * Helper utilities for Dina Automation Tests
 * Contains reusable functions for test data generation and common operations
 */

/**
 * Generate a random number within a range
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @returns {number} Random number
 */
export const getRandomNumber = (min = 1, max = 10000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate a random title with a prefix
 * @param {string} prefix - Prefix for the title
 * @returns {string} Random title
 */
export const generateRandomTitle = (prefix = 'Automated Random Title') => {
    const randomNumber = getRandomNumber();
    return `${prefix}: ${randomNumber}`;
};

/**
 * Generate a random email address
 * @param {string} domain - Email domain (default: 'test.com')
 * @returns {string} Random email
 */
export const generateRandomEmail = (domain = 'test.com') => {
    const randomString = Math.random().toString(36).substring(2, 10);
    return `test_${randomString}@${domain}`;
};

/**
 * Generate a timestamp-based unique identifier
 * @returns {string} Unique identifier
 */
export const generateUniqueId = () => {
    return `id_${Date.now()}_${getRandomNumber(1000, 9999)}`;
};

/**
 * Wait for a specific amount of time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after the wait
 */
export const wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Format a date to YYYY-MM-DD
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export const formatDate = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Get current timestamp
 * @returns {number} Current timestamp
 */
export const getCurrentTimestamp = () => {
    return Date.now();
};

/**
 * Sanitize text for use in selectors or test data
 * @param {string} text - Text to sanitize
 * @returns {string} Sanitized text
 */
export const sanitizeText = (text) => {
    return text.trim().replace(/\s+/g, ' ');
};

/**
 * Check if element exists without failing the test
 * @param {string} selector - CSS selector
 * @returns {Cypress.Chainable<boolean>}
 */
export const elementExists = (selector) => {
    return cy.get('body').then(($body) => {
        return $body.find(selector).length > 0;
    });
};

/**
 * Retry an action until it succeeds or max attempts reached
 * @param {Function} action - Action to retry
 * @param {number} maxAttempts - Maximum number of attempts
 * @param {number} delayMs - Delay between attempts in milliseconds
 */
export const retryAction = async (action, maxAttempts = 3, delayMs = 1000) => {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            await action();
            return;
        } catch (error) {
            if (attempt === maxAttempts) {
                throw error;
            }
            await wait(delayMs);
        }
    }
};
