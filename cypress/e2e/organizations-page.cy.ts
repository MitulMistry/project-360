describe("Organizations page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard/organizations");
  });

  it("should show the header", () => {
    cy.get("h1").contains("Organizations");
  });
});
