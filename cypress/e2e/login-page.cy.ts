describe("Login page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("should show the header", () => {
    cy.get("h1").contains("Sign In");
  });

  it("should have an authentication link", () => {
    cy.get("[data-testid='signup']")
      .should("have.attr", "href", "/signup")
      .contains("Create an account");
  });

  it("should show the form", () => {
    cy.get("[data-testid='emailInput']").should("be.visible");
    cy.get("[data-testid='passwordInput']").should("be.visible");

    cy.get("label").should((labels) => {
      expect(labels[0]).to.contain.text("Email");
      expect(labels[1]).to.contain.text("Password");
    });
  });

  it("should have a GitHub OAuth button", () => {
    cy.get("[data-testid='gitHubOAuthButton']").contains(
      "Continue with GitHub",
    );
  });
});
