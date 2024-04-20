import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@features/projects";
import QueryClientWrapper from "../../../api/query-client-wrapper";
import { mockProjectWithTasks1 } from "../../../__mocks__/project";
import { titleCase, formatDate } from "@/app/lib/helpers";
import { statusToTextMap } from "@features/ui";

describe("Project Card", () => {
  describe("User is not owner", () => {
    const project = mockProjectWithTasks1;
    project.isManager = false;
    const projectIdx = 0; // Only testing one project, so idx will always be 0

    beforeEach(() => {
      render(
        <QueryClientWrapper>
          <ProjectCard project={project} projectIdx={projectIdx} />
        </QueryClientWrapper>,
      );
    });

    it("renders data", () => {
      const title = screen.getByTestId(`project-card-title-${projectIdx}`);
      expect(title.textContent).toContain(titleCase(project.name));

      for (let i = 0; i < project.tasks.length; i++) {
        const idx = `${projectIdx}-${i}`;
        const {
          name,
          assignee,
          status,
          priority,
          timeEstimate,
          timeEstimateUnits,
          dueDate,
        } = project.tasks[i];

        const nameCell = screen.getByTestId(`task-name-${idx}`);
        expect(nameCell.textContent).toContain(titleCase(name));

        const assigneeCell = screen.getByTestId(`task-assignee-name-${idx}`);
        expect(assigneeCell.textContent).toContain(titleCase(assignee.name));

        const statusCell = screen.getByTestId(`task-status-${idx}`);
        expect(statusCell.textContent).toContain(statusToTextMap[status]);

        const priorityCell = screen.getByTestId(`task-priority-${idx}`);
        expect(priorityCell.textContent).toContain(statusToTextMap[priority]);

        const timeEstimateCell = screen.getByTestId(
          `task-time-estimate-${idx}`,
        );
        expect(timeEstimateCell.textContent).toContain(
          `${timeEstimate} ${timeEstimateUnits}`,
        );

        const dueDateCell = screen.getByTestId(`task-due-date-${idx}`);
        expect(dueDateCell.textContent).toContain(formatDate(dueDate));
      }
    });

    it("does not render edit or submit buttons", () => {
      for (let i = 0; i < project.tasks.length; i++) {
        const idx = `${projectIdx}-${i}`;

        // queryByTestId, unlike getByTestId, will return null if element not found
        const editButton = screen.queryByTestId(`user-edit-button-${idx}`);
        expect(editButton).toBeNull();

        const submitButton = screen.queryByTestId(`user-submit-button-${idx}`);
        expect(submitButton).toBeNull();
      }
    });
  });

  describe("User is owner", () => {
    const project = mockProjectWithTasks1;
    project.isManager = true;
    const projectIdx = 0;

    beforeEach(() => {
      render(
        <QueryClientWrapper>
          <ProjectCard project={project} projectIdx={projectIdx} />
        </QueryClientWrapper>,
      );
    });

    it("renders edit buttons", () => {
      for (let i = 0; i < project.tasks.length; i++) {
        const idx = `${projectIdx}-${i}`;

        // Buttons should be available only if user is not owner
        const editButton = screen.getByTestId(`task-edit-button-${idx}`);
        expect(editButton).toBeInTheDocument();
      }
    });

    // it("renders edit form and submit button on edit button press", () => {
    //   for (let i = 0; i < users.length; i++) {
    //     // Skip owners
    //     if (users[i].role === Role.OWNER) continue;

    //     let select = screen.queryByTestId(`user-role-select-${i}`);
    //     expect(select).toBeNull();

    //     let submitButton = screen.queryByTestId(`user-submit-button-${i}`);
    //     expect(submitButton).toBeNull();

    //     const editButton = screen.getByTestId(`user-edit-button-${i}`);
    //     fireEvent.click(editButton);

    //     select = screen.getByTestId(`user-role-select-${i}`);
    //     expect(select).toBeInTheDocument();

    //     submitButton = screen.getByTestId(`user-submit-button-${i}`);
    //     expect(submitButton).toBeInTheDocument();
    //   }
    // });
  });
});
