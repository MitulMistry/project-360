import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProjectNewForm } from "@features/projects";
import QueryClientWrapper from "../../../api/query-client-wrapper";

describe("Project New Form", () => {
  beforeEach(() => {
    render(
      <QueryClientWrapper>
        <ProjectNewForm />
      </QueryClientWrapper>,
    );
  });

  it("renders text input", () => {
    const name = screen.getByTestId("project-name-input");

    expect(name).toBeInTheDocument();
  });

  it("renders a create button", () => {
    const button = screen.getByTestId("project-create-button");

    expect(button).toBeInTheDocument();
  });
});
