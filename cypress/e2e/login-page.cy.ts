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
    cy.get("label").should((labels) => {
      expect(labels[0]).to.contain.text("Email");
      expect(labels[1]).to.contain.text("Password");
    });
  });
});
