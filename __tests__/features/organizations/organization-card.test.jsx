import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { OrganizationCard } from "@features/organizations";

describe("Organization Card", () => {
  const date = new Date();

  const owner = {
    id: "clud0qust000208l4cq5f5usy",
    createdAt: new Date(date.getDate()),
    name: "Bob Smith",
    email: "Bob@example.com",
    emailVerified: null,
    image: "",
  };

  const organization = {
    id: "clud0qi6g000008l49ga1g1d9",
    createdAt: new Date(date.getDate()),
    name: "Development Team",
  };

  beforeEach(() => {
    render(<OrganizationCard organization={organization} owner={owner} />);
  });

  it("renders data", () => {
    const orgName = screen.getByTestId("org-card-name");
    expect(orgName.textContent).toContain(organization.name);

    const orgId = screen.getByTestId("org-card-id");
    expect(orgId.textContent).toContain(organization.id);

    const ownerName = screen.getByTestId("org-card-owner");
    expect(ownerName.textContent).toContain(owner.name);
  });

  it("renders selector", () => {
    const selector = screen.getByTestId("org-card-selector");

    expect(selector).toBeInTheDocument();
  });
});
