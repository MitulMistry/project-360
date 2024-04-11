import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { OrganizationNewForm } from "@features/organizations";
import QueryClientWrapper from "../../../api/query-client-wrapper";

describe("Organization New Form", () => {
  beforeEach(() => {
    render(
      <QueryClientWrapper>
        <OrganizationNewForm />
      </QueryClientWrapper>,
    );
  });

  it("renders text input", () => {
    const name = screen.getByTestId("org-name-input");

    expect(name).toBeInTheDocument();
  });

  it("renders a create button", () => {
    const button = screen.getByTestId("org-create-button");

    expect(button).toBeInTheDocument();
  });
});
