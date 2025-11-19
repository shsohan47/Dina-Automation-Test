// cypress/support/pages/HomePage.js

class Spaces {
  // Selectors for different elements on the page

  createNewViewButton = "div[role='tablist'] button[data-state='closed'] svg[width='48'][height='40']";
  modalContainer = "[class*='react-draggable']";
  layoutSelector = ".css-10mpywq > :nth-child(1)";
  viewTitleInput = "#view-title";
  createButton = 'Create';
  createdViewsList = 'nav [role="tablist"]';
  viewRightClickModal = '[style="position: fixed; z-index: 1300; inset: 0px;"] > .MuiPaper-root > .MuiList-root';
  rightClickEditOption = ".MuiPaper-root > .MuiList-root > :nth-child(1) > .MuiButtonBase-root";
  rightCLickDeleteOption = ".MuiPaper-root > .MuiList-root > :nth-child(2) > .MuiButtonBase-root";
  editModalViewTitle = '#view-title';
  editModalApplyButton = "Apply";
  editModalCancleButton = "Cancel";
  NoWidgetViewModal = ".css-xkw6zm";
  addFirstWidgetButton = ".css-xkw6zm > .Button";
  widgetModal = '[style="position: fixed; z-index: 1300; inset: 0px;"] > .MuiPaper-root > .MuiList-root';
  filterButton = '.css-u2o7y3 > .css-qk8wrb';
  deleteButton = ':nth-child(2) > .MuiButtonBase-root > .css-1suue7j';
  deleteConfirmationModal = '.css-1o88u2p';

  // Generates a random view title
  generateRandomTitle() {
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    return `Automated Random Title: ${randomNumber}`;
  }

  openCreateNewViewModal() {
    cy.get(this.createNewViewButton, { timeout: 15000 }).click();
    cy.get('h2').contains("Create new view").parents(this.modalContainer).should("be.visible");
  }

  createNewView(viewTitle) {
    this.openCreateNewViewModal();
    cy.get(this.viewTitleInput).click().type(viewTitle);
    cy.get(this.layoutSelector).click();
    cy.contains('h2', 'Create new view')
      .parents(this.modalContainer)
      .find('button[aria-label="Create view"]')
      .should('not.be.disabled')
      .click();
  }

  verifyViewCreated(viewTitle) {
    cy.get(this.createdViewsList).children().should("have.length.at.least", 1);
    cy.get(this.createdViewsList).contains(viewTitle).should("be.visible");
  }

  verifyEditFunction(viewTitle, editTitle) {
    cy.contains(viewTitle, { timeout: 15000 }).click().rightclick();
    cy.get(this.viewRightClickModal).should("be.visible").within(() => {
      cy.get("li").first().click();
    });

    cy.get(this.editModalViewTitle)
      .should('be.visible')
      .parentsUntil('body')
      .filter((index, el) => el.querySelector("table"))
      .first()
      .as('modalContainer');

    cy.get('@modalContainer').within(() => {
      cy.get(this.editModalViewTitle).clear();

      if (editTitle) {
        cy.get(this.editModalViewTitle).type(editTitle);
        cy.contains('button', this.editModalApplyButton).should('not.be.disabled').click();
      } else {
        cy.contains('button', this.editModalApplyButton).should('be.disabled');
        cy.contains('button', this.editModalCancleButton).click({ force: true });
      }
    });

    if (editTitle) {
      cy.contains(editTitle).should('be.visible');
    }
  }

  verifyDeleteFunction(titleName) {
    cy.contains(titleName).click().rightclick();
    cy.get(this.viewRightClickModal).within(() => {
      cy.get(this.deleteButton).click();
    });
    cy.get(this.deleteConfirmationModal).should('be.visible');
    cy.contains('button', 'Delete').click();
  }

  addYourFirstWidget(generateRandomTitle) {
    this.createNewView(generateRandomTitle);
    cy.contains(generateRandomTitle, { timeout: 15000 }).click();
    cy.get(this.NoWidgetViewModal).should("exist");
    cy.get(this.addFirstWidgetButton).click();
    cy.get(this.widgetModal).should('exist').within(() => {
      cy.contains('Feed').click();
    });
    cy.get('.css-1hth4v0-Header').should("be.visible");
  }
}

export default Spaces;