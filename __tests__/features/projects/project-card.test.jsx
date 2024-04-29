import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ProjectCard } from "@features/projects";
import QueryClientWrapper from "../../../api/query-client-wrapper";
import { mockProjectWithTasks1 } from "../../../__mocks__/project";
import { titleCase, formatDate } from "@/app/lib/helpers";
import { statusToTextMap } from "@features/ui";

describe("Project Card", () => {
  describe("User is not manager", () => {
    // Duplicate the object since we're changing a value
    const project = Object.assign({}, mockProjectWithTasks1);
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

    it("does not render project edit, delete, or submit buttons", () => {
      // queryByTestId, unlike getByTestId, will return null if element not found
      const editButton = screen.queryByTestId("project-edit-button");
      expect(editButton).toBeNull();

      const deleteButton = screen.queryByTestId("project-delete-button");
      expect(deleteButton).toBeNull();

      const submitButton = screen.queryByTestId("project-submit-button");
      expect(submitButton).toBeNull();
    });

    it("does not render task edit or submit buttons", () => {
      for (let i = 0; i < project.tasks.length; i++) {
        const idx = `${projectIdx}-${i}`;

        // queryByTestId, unlike getByTestId, will return null if element not found
        const editButton = screen.queryByTestId(`task-edit-button-${idx}`);
        expect(editButton).toBeNull();

        const submitButton = screen.queryByTestId(`task-submit-button-${idx}`);
        expect(submitButton).toBeNull();
      }
    });
  });

  describe("User is manager", () => {
    const project = mockProjectWithTasks1;
    const projectIdx = 0;

    beforeEach(() => {
      render(
        <QueryClientWrapper>
          <ProjectCard project={project} projectIdx={projectIdx} />
        </QueryClientWrapper>,
      );
    });

    it("renders project edit and delete buttons", () => {
      const editButton = screen.getByTestId("project-edit-button");
      expect(editButton).toBeInTheDocument();

      const deleteButton = screen.getByTestId("project-delete-button");
      expect(deleteButton).toBeInTheDocument();

      // const submitButton = screen.getByTestId("project-submit-button");
      // expect(submitButton).toBeNull();
    });

    it("renders project edit form on button press", () => {
      let form = screen.queryByTestId("project-edit-form");
      expect(form).toBeNull();

      const editButton = screen.getByTestId("project-edit-button");
      fireEvent.click(editButton);

      form = screen.getByTestId("project-edit-form");
      expect(form).toBeInTheDocument();
    });

    it("renders task edit buttons", () => {
      for (let i = 0; i < project.tasks.length; i++) {
        const idx = `${projectIdx}-${i}`;

        // Buttons should be available only if user is a manager
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
