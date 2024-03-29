describe("Projects page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard/projects");
  });

  it("should show the header", () => {
    cy.get("h1").contains("Projects");
  });
});
