describe("Edit an Interview", () => {
  it("Successfully edit an interview", () => {

// Visits the root of our web server
cy.visit("/");

// Clicks on the "Edit" button in the first appointment
cy.get("[alt=Edit]").click({force: true})

// Replaces the name
cy.get("[data-testid=student-name-input]").clear().type("Agatha Christie")

// Chooses an interviewer
cy.get(":nth-child(2) > .interviewers__item-image").click()

// Clicks the save button
cy.get(".button--confirm").click()

// Sees the modified booked appointment
cy.contains(":nth-child(1) > .appointment__card > .appointment__card-left > h2.text--regular", "Agatha Christie")
  });
})