describe("Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should show the description text", () => {
    cy.get("[data-testid='splash']").contains(
      "Create projects, assign tasks, and manage the workflow for your organization.",
    );
  });

  it("should have authentication links", () => {
    cy.get("[data-testid='signup']")
      .should("have.attr", "href", "/signup")
      .contains("Create Account");

    cy.get("[data-testid='login']")
      .contains("Sign In")
      .should("have.attr", "href", "/login");
  });
});
