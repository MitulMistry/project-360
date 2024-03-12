import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Splash page", () => {
  it("renders a description", () => {
    render(<Page />);

    const description = screen.getByText(
      "Create projects, assign tasks, and manage the workflow for your organization.",
    );

    expect(description).toBeInTheDocument();
  });
});
