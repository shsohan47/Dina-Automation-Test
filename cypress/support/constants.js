/**
 * Constants file for Dina Automation Test
 * Centralizes timeout values, common messages, and reusable configuration
 */

// Timeout configurations (in milliseconds)
export const TIMEOUTS = {
  SHORT: 5000,
  DEFAULT: 15000,
  EXTENDED: 25000,
  API: 60000,
};

// Common validation messages
export const VALIDATION_MESSAGES = {
  USER_NOT_EXIST: 'User does not exist.',
  INCORRECT_CREDENTIALS: 'Incorrect username or password.',
};

// Common tooltips
export const TOOLTIPS = {
  HOME: 'Home',
};

// Widget types
export const WIDGET_TYPES = {
  FEED: 'Feed',
  CALENDAR: 'Calendar',
  TASKS: 'Tasks',
};

// View layout types
export const LAYOUT_TYPES = {
  SINGLE_COLUMN: 'single',
  TWO_COLUMN: 'two-column',
  THREE_COLUMN: 'three-column',
};

// Common CSS classes (to be replaced with data-testid in the future)
export const COMMON_SELECTORS = {
  TOOLBAR: '.MuiToolbar-root',
  MODAL_CONTAINER: '.css-1o88u2p',
  BUTTON_BASE: '.MuiButtonBase-root',
};

// Test data prefixes
export const TEST_DATA_PREFIX = {
  VIEW_TITLE: 'Automated Test View',
  RANDOM_TITLE: 'Automated Random Title',
  WIDGET_TITLE: 'Automated Feed Widget Title',
};
