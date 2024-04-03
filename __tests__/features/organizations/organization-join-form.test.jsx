import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { OrganizationJoinForm } from "@features/organizations";

describe("Organization Join Form", () => {
  beforeEach(() => {
    render(<OrganizationJoinForm />);
  });

  it("renders text input", () => {
    const name = screen.getByTestId("org-id-input");

    expect(name).toBeInTheDocument();
  });

  it("renders a join button", () => {
    const button = screen.getByTestId("org-join-button");

    expect(button).toBeInTheDocument();
  });
});
