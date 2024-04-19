import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { TeamTable } from "@features/team";
import QueryClientWrapper from "../../../api/query-client-wrapper";
import {
  mockOrganizationWithOwner1,
  mockOrganizationWithOwner2,
} from "../../../__mocks__/organization";
import { mockUsersSimple1 } from "../../../__mocks__/user";
import { Role } from "@prisma/client";
import { titleCase } from "@/app/lib/helpers";

describe("Team Table", () => {
  describe("User is not owner", () => {
    const organization = mockOrganizationWithOwner1;
    const users = mockUsersSimple1;

    beforeEach(() => {
      render(
        <QueryClientWrapper>
          <TeamTable currentOrganization={organization} users={users} />
        </QueryClientWrapper>,
      );
    });

    it("renders data", () => {
      for (let i = 0; i < users.length; i++) {
        const { name, email, role } = users[i];

        const nameCell = screen.getByTestId(`user-name-${i}`);
        expect(nameCell.textContent).toContain(name);

        const emailCell = screen.getByTestId(`user-email-${i}`);
        expect(emailCell.textContent).toContain(email);

        const roleCell = screen.getByTestId(`user-role-${i}`);
        expect(roleCell.textContent).toContain(titleCase(role));
      }
    });

    it("does not render edit or submit buttons", () => {
      for (let i = 0; i < users.length; i++) {
        // queryByTestId, unlike getByTestId, will return null if element not found
        const editButton = screen.queryByTestId(`user-edit-button-${i}`);
        expect(editButton).toBeNull();

        const submitButton = screen.queryByTestId(`user-submit-button-${i}`);
        expect(submitButton).toBeNull();
      }
    });
  });

  describe("User is owner", () => {
    const organization = mockOrganizationWithOwner2;
    const users = mockUsersSimple1;

    beforeEach(() => {
      render(
        <QueryClientWrapper>
          <TeamTable currentOrganization={organization} users={users} />
        </QueryClientWrapper>,
      );
    });

    it("renders edit buttons (not for owners)", () => {
      for (let i = 0; i < users.length; i++) {
        // If the user is owner, should not be able to edit
        if (users[i].role === Role.OWNER) {
          const editButton = screen.queryByTestId(`user-edit-button-${i}`);
          expect(editButton).toBeNull();
        } else {
          // Buttons should be available only if user is not owner
          const editButton = screen.getByTestId(`user-edit-button-${i}`);
          expect(editButton).toBeInTheDocument();
        }
      }
    });

    it("renders edit form and submit button on edit button press", () => {
      for (let i = 0; i < users.length; i++) {
        // Skip owners
        if (users[i].role === Role.OWNER) continue;

        let select = screen.queryByTestId(`user-role-select-${i}`);
        expect(select).toBeNull();

        let submitButton = screen.queryByTestId(`user-submit-button-${i}`);
        expect(submitButton).toBeNull();

        const editButton = screen.getByTestId(`user-edit-button-${i}`);
        fireEvent.click(editButton);

        select = screen.getByTestId(`user-role-select-${i}`);
        expect(select).toBeInTheDocument();

        submitButton = screen.getByTestId(`user-submit-button-${i}`);
        expect(submitButton).toBeInTheDocument();
      }
    });
  });
});
