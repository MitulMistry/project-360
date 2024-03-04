describe("Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should show the description text", () => {
    cy.get("[data-testid='description']").contains("Get started by editing");
  });
});
