describe("Book an Interview", () => {
  it("Successfully book an interview", () => {

// Visits the root of our web server
cy.visit("/");

// Clicks on the "Add" button in the second appointment
cy.get(":nth-child(2) > .appointment__add > .appointment__add-button").click();

// Enters their name
cy.get("[data-testid=student-name-input]").type("Mrs Jones");

// Chooses an interviewer
cy.get(":nth-child(1) > .interviewers__item-image").click();

// Clicks the save button
cy.get(".button--confirm").click();

// Sees the booked appointment
cy.contains(":nth-child(2) > .appointment__card > .appointment__card-left > h2.text--regular", "Mrs Jones");    
  });
});