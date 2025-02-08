// cypress/support/pages/HomePage.js

class Spaces {
  // Selectors for different elements on the page
  createNewViewButton = ".css-11qfyq1 > svg";
  modalContainer = ".css-1o88u2p";
  layoutSelector = ".css-10mpywq > :nth-child(1)";
  viewTitleInput =
    ".MuiInputBase-root.MuiFilledInput-root.MuiFilledInput-underline.Mui-error.Mui-error.MuiInputBase-fullWidth.MuiInputBase-formControl";
  createButton = ".css-1qmerqt > .Button";
  createdViewsList = ".css-7r4jfq";
  viewRightClickModal =
    '[style="position: fixed; z-index: 1300; inset: 0px;"] > .MuiPaper-root > .MuiList-root';
  rightClickEditOption =
    ".MuiPaper-root > .MuiList-root > :nth-child(1) > .MuiButtonBase-root";
  rightCLickDeleteOption =
    ".MuiPaper-root > .MuiList-root > :nth-child(2) > .MuiButtonBase-root";
  editModal = ".css-1o88u2p";
  editModalViewTitle = ".css-l89pnf";
  editModalApplyButton = "Apply";
  editModalCancleButton = "Cancel";
  NoWidgetViewModal = ".css-xkw6zm";
  addFirstWidgetButton = ".css-xkw6zm > .Button";
  widgetModal = '[style="position: fixed; z-index: 1300; inset: 0px;"] > .MuiPaper-root > .MuiList-root';
 filterButton = '.css-u2o7y3 > .css-qk8wrb'
 deleteButton = ':nth-child(2) > .MuiButtonBase-root > .css-1suue7j'
 deleteConfirmationModal = '.css-1o88u2p'

  //For random generated Title function
   generateRandomTitle() {
    const randomNumber = Math.floor(Math.random() * 10000) + 1; // Random number between 1 and 10000
    return `Automated Random Title: ${randomNumber}`;
  }
  
  // Method to open the "Create New View" modal
  openCreateNewViewModal() {
    cy.get(this.createNewViewButton,{timeout:15000}).click();
    cy.get(this.modalContainer).should("be.visible");
  }

  // Method to create a new view
  createNewView(viewTitle) {
    // Check if modal is open
    this.openCreateNewViewModal();

    // Enter view title and select layout
    cy.get(this.viewTitleInput,{timeout:15000}).click().type(viewTitle);
    cy.get(this.layoutSelector,{timeout:15000}).click();

    // Verify that the create button is enabled, then click it
    cy.get(this.createButton).should("not.be.disabled");
    cy.get(this.createButton).click();
  }

  // Method to verify the view was created
  verifyViewCreated(viewTitle) {
    cy.get(this.createdViewsList).children().should("have.length.at.least", 1);
    cy.get(this.createdViewsList).contains(viewTitle).should("be.visible");
  }

  //edit the view
  verifyEditFunction(viewTitle, editTitle) {
    // Right-click on the specified view title
    cy.contains(viewTitle, { timeout: 15000 }).click().rightclick();

    // Open the edit option from the modal
    cy.get(this.viewRightClickModal)
      .should("be.visible")
      .within(() => {
        cy.get("li").first().click(); // Clicks the "Edit" option assuming it's the first item
      });

    // Verify that the edit modal is visible after clicking edit
    cy.get(this.editModal)
      .should("be.visible")
      .then((editModal) => {
        cy.wrap(editModal).within(() => {
          // Clear the title field and type it
          cy.get(this.editModalViewTitle).clear();
        });
        if (editTitle) {
          // If editTitle is not empty, type the title and click apply
          cy.get(this.editModalViewTitle).type(editTitle);
          cy.contains(this.editModalApplyButton).click();

          // Verify that the updated title is visible outside the modal
          //cy.contains(editTitle).should('be.visible');
        } else {
          // If editTitle is empty, verify that the button is disabled (or error message appears)
          cy.contains(this.editModalApplyButton).should("be.disabled");
          cy.contains(this.editModalCancleButton).click({ force: true });
        }
        if (editTitle) {
          // Ensure the title changed
          cy.contains(editTitle).should("be.visible");
        }
      });
  }

  verifyDeleteFunction(titleName)
  {
    cy.contains(titleName).click().rightclick();
    cy.get('[style="position: fixed; z-index: 1300; inset: 0px;"] > .MuiPaper-root > .MuiList-root').within(()=>
    {
      cy.get(this.deleteButton).click();
    })
    cy.get(this.deleteConfirmationModal).should('be.visible');
    cy.get('.Button.css-100skwn-G8').eq(1).click({force:true});
  }
  //Test case for add your first widget button
  addYourFirstWidget(generateRandomTitle) {
    this.createNewView(generateRandomTitle)
    // Wait for and click the element with UpdatedTitle, with a timeout of 15 seconds
    cy.contains(generateRandomTitle, { timeout: 15000 }).click();
    
    // Verify the NoWidgetViewModal is visible
    cy.get(this.NoWidgetViewModal).should("exist");
  
    // Open the modal by clicking the button to add the first widget
    cy.get(this.addFirstWidgetButton).click();
  
    // Verify the widget modal appears
    cy.get(this.widgetModal).should('exist').within(() => {
      // Click on the first widget in the list to create it
      cy.contains('Feed').click();
    });
    cy.get('.css-1hth4v0-Header').should("be.visible");
    this.verifyDeleteFunction(generateRandomTitle);
    cy.get(this.createdViewsList).should('not.contain',generateRandomTitle)
    // Optionally, verify that the widget was created and is visible after selection
    //cy.get(this.createdWidgetSelector).should('be.visible');
  }
  
}

export default Spaces;
