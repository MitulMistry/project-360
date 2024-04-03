import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { OrganizationNewForm } from "@features/organizations";

describe("Organization New Form", () => {
  beforeEach(() => {
    render(<OrganizationNewForm />);
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
