import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Page", () => {
  it("renders a description", () => {
    render(<Page />);

    const description = screen.getByText("Get started by editing");

    expect(description).toBeInTheDocument();
  });
});
