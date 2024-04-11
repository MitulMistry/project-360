import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { OrganizationCard } from "@features/organizations";
import QueryClientWrapper from "../../../api/query-client-wrapper";
import {
  mockOrganizationWithOwner1,
  mockOrganizationWithOwner2,
} from "../../../__mocks__/organization";
import { mockUser1 } from "../../../__mocks__/user";

describe("Organization Card", () => {
  describe("User is not owner", () => {
    const owner = mockUser1;
    const organization = mockOrganizationWithOwner1;

    beforeEach(() => {
      render(
        <QueryClientWrapper>
          <OrganizationCard organization={organization} owner={owner} />
        </QueryClientWrapper>,
      );
    });

    it("renders data", () => {
      const orgName = screen.getByTestId("org-card-name");
      expect(orgName.textContent).toContain(organization.name);

      const orgId = screen.getByTestId("org-card-id");
      expect(orgId.textContent).toContain(organization.id);

      const ownerName = screen.getByTestId("org-card-owner");
      expect(ownerName.textContent).toContain(owner.name);
    });

    it("renders selector", () => {
      const selector = screen.getByTestId("org-card-selector");

      expect(selector).toBeInTheDocument();
    });

    it("renders leave button", () => {
      const leaveButton = screen.getByTestId("org-leave-button");

      expect(leaveButton).toBeInTheDocument();
    });

    it("does not render owner buttons", () => {
      // queryByTestId, unlike getByTestId, will return null if element not found
      const editButton = screen.queryByTestId("org-edit-button");
      const deleteButton = screen.queryByTestId("org-delete-button");

      expect(editButton).toBeNull();
      expect(deleteButton).toBeNull();
    });
  });

  describe("User is owner", () => {
    const owner = mockUser1;
    const organization = mockOrganizationWithOwner2;

    beforeEach(() => {
      render(
        <QueryClientWrapper>
          <OrganizationCard organization={organization} owner={owner} />
        </QueryClientWrapper>,
      );
    });

    it("renders edit button", () => {
      const editButton = screen.getByTestId("org-edit-button");

      expect(editButton).toBeInTheDocument();
    });

    it("renders delete button", () => {
      const deleteButton = screen.getByTestId("org-delete-button");

      expect(deleteButton).toBeInTheDocument();
    });

    it("does not render non-owner buttons", () => {
      const leaveButton = screen.queryByTestId("org-leave-button");

      expect(leaveButton).toBeNull();
    });

    it("renders edit form on button press", () => {
      let form = screen.queryByTestId("org-edit-form");
      expect(form).toBeNull();

      const editButton = screen.getByTestId("org-edit-button");
      fireEvent.click(editButton);

      form = screen.getByTestId("org-edit-form");
      expect(form).toBeInTheDocument();
    });
  });
});
