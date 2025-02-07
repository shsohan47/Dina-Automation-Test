// cypress/support/pages/HomePage.js

class Spaces {
    // Selectors for different elements on the page
    createNewViewButton = '.css-xi14m > svg';
    modalContainer = '.css-zyzje6';
    layoutSelector = '.css-16x0q08 > :nth-child(6)';
    viewTitleInput = '.MuiInputBase-root.MuiFilledInput-root.MuiFilledInput-underline.Mui-error.Mui-error.MuiInputBase-fullWidth.MuiInputBase-formControl';
    createButton = '.css-acb0ak > span';
    createdViewsList = '.css-7r4jfq';
    viewRightClickModal = '[style="position: fixed; z-index: 1300; inset: 0px;"] > .MuiPaper-root > .MuiList-root';
    rightClickEditOption = '.MuiPaper-root > .MuiList-root > :nth-child(1) > .MuiButtonBase-root';
    rightCLickDeleteOption = '.MuiPaper-root > .MuiList-root > :nth-child(2) > .MuiButtonBase-root'
    editModal = '.css-ncxfgu'
    editModalViewTitle = '.css-l89pnf'
    editModalApplyButton = '.Button.css-1af6hn3-I'
    editModalCancleButton = ".Button.css-f7k1iq-I"

    
    // Method to open the "Create New View" modal
    openCreateNewViewModal() {
      cy.get(this.createNewViewButton).click();
      cy.get(this.modalContainer).should('be.visible');
    }
  
  
    // Method to create a new view
    createNewView(viewTitle) {
      // Check if modal is open
      this.openCreateNewViewModal();
  
      // Enter view title and select layout
      cy.get(this.viewTitleInput).click().type(viewTitle);
      cy.get(this.layoutSelector).click();
  
      // Verify that the create button is enabled, then click it
      cy.get(this.createButton).should('not.be.disabled').click();
    }
  
    // Method to verify the view was created
    verifyViewCreated(viewTitle) {
      cy.get(this.createdViewsList).children().should('have.length.at.least', 1);
      cy.get(this.createdViewsList).contains(viewTitle).should('be.visible');
    }



    //edit the view
    verifyEditFunction(viewTitle, editTitle) {
      // Right-click on the specified view title
      cy.contains(viewTitle,{timeout:15000}).click().rightclick();
    
      // Open the edit option from the modal
      cy.get(this.viewRightClickModal).should('be.visible').within(() => {
        cy.get('li').first().click(); // Clicks the "Edit" option assuming it's the first item
      });
    
      // Verify that the edit modal is visible after clicking edit
      cy.get(this.editModal).should('be.visible').then((editModal) => {
        cy.wrap(editModal).within(() => {
          // Clear the title field and type it
          cy.get(this.editModalViewTitle).clear();
    
          if (editTitle) {
            // If editTitle is not empty, type the title and click apply
            cy.get(this.editModalViewTitle).type(editTitle);
            cy.get(this.editModalApplyButton).click();
            
            // Verify that the updated title is visible outside the modal
            //cy.contains(editTitle).should('be.visible');
          } else {
            // If editTitle is empty, verify that the button is disabled (or error message appears)
            cy.get(this.editModalApplyButton).should('be.disabled');
            cy.get(this.editModalCancleButton).click();  
          }
          if(editTitle)
            {
              // Ensure the title changed
              cy.contains(editTitle).should('be.visible');
            }

        });
      });
    }
    
  }
  
  export default Spaces;
  