describe("Cancel an Interview", () => {
  it("Successfully cancels an interview", () => {

// Visits the root of our web server
cy.visit("/");

// Clicks on the "Trash Can" to delete the first appointment
cy.get("[alt=Delete]").click({force: true});

// Click on confirm to delete the appointment
cy.contains("Confirm").click();

// Sees the booked appointment disappeared
cy.get(":nth-child(1) > .appointment__add").should('not.contain', 'Archie Cohen')
  });
})