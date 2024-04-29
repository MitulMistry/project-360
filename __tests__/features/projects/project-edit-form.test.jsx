import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProjectEditForm } from "@features/projects";
import QueryClientWrapper from "../../../api/query-client-wrapper";
import { mockProjectWithTasks1 } from "../../../__mocks__/project";

const project = mockProjectWithTasks1;

describe("Project Edit Form", () => {
  beforeEach(() => {
    render(
      <QueryClientWrapper>
        <ProjectEditForm project={project} />
      </QueryClientWrapper>,
    );
  });

  it("renders prefilled text input", () => {
    const name = screen.getByTestId("project-name-input");

    expect(name).toBeInTheDocument();
    expect(screen.getByDisplayValue(project.name)).toBeInTheDocument();
  });

  it("renders an update button", () => {
    const button = screen.getByTestId("project-update-button");

    expect(button).toBeInTheDocument();
  });
});
