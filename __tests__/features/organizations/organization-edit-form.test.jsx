import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { OrganizationEditForm } from "@features/organizations";
import QueryClientWrapper from "../../../api/query-client-wrapper";
import { mockOrganizationWithOwner1 } from "../../../__mocks__/organization";

const organization = mockOrganizationWithOwner1;

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
