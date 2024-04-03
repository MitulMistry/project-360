describe("Organizations page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard/organizations");
  });

  it("should show the header", () => {
    cy.get("h1").contains("Organizations");
  });

  it("should show the interface buttons", () => {
    cy.get("[data-testid='org-enable-join-btn']").should("be.visible");
    cy.get("[data-testid='org-enable-new-btn']").should("be.visible");
  });

  it("should enable the organization join form on button press", () => {
    cy.get("[data-testid='org-join-form']").should("not.exist");
    cy.get("[data-testid='org-new-form']").should("not.exist");

    cy.get("[data-testid='org-enable-join-btn']").click();

    cy.get("[data-testid='org-join-form']").should("be.visible");
    cy.get("[data-testid='org-new-form']").should("not.exist");
  });

  it("should enable the organization new form on button press", () => {
    cy.get("[data-testid='org-join-form']").should("not.exist");
    cy.get("[data-testid='org-new-form']").should("not.exist");

    cy.get("[data-testid='org-enable-new-btn']").click();

    cy.get("[data-testid='org-join-form']").should("not.exist");
    cy.get("[data-testid='org-new-form']").should("be.visible");
  });

  it("should swap between organization new and join forms on button press", () => {
    cy.get("[data-testid='org-join-form']").should("not.exist");
    cy.get("[data-testid='org-new-form']").should("not.exist");

    cy.get("[data-testid='org-enable-join-btn']").click();

    cy.get("[data-testid='org-join-form']").should("be.visible");
    cy.get("[data-testid='org-new-form']").should("not.exist");

    cy.get("[data-testid='org-enable-new-btn']").click();

    cy.get("[data-testid='org-join-form']").should("not.exist");
    cy.get("[data-testid='org-new-form']").should("be.visible");
  });
});
