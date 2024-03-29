describe("Team page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard/team");
  });

  it("should show the header", () => {
    cy.get("h1").contains("Team");
  });
});
