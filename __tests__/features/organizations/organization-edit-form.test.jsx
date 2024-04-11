import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { OrganizationEditForm } from "@features/organizations";
import QueryClientWrapper from "../../../api/query-client-wrapper";

const date = new Date();

const organization = {
  id: "clud0qi6g000008l49ga1g1d9",
  createdAt: new Date(date.getDate()),
  name: "Development Team",
  isOwner: true,
};

describe("Organization Edit Form", () => {
  beforeEach(() => {
    render(
      <QueryClientWrapper>
        <OrganizationEditForm organization={organization} />
      </QueryClientWrapper>,
    );
  });

  it("renders prefilled text input", () => {
    const name = screen.getByTestId("org-name-input");

    expect(name).toBeInTheDocument();
    expect(screen.getByDisplayValue(organization.name)).toBeInTheDocument();
  });

  it("renders an update button", () => {
    const button = screen.getByTestId("org-update-button");

    expect(button).toBeInTheDocument();
  });
});
