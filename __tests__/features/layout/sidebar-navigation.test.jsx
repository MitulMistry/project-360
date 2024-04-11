import React from "react";
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { SidebarNavigation } from "@features/layout";
import { CurrentDataProvider } from "../../../app/context/current-data-provider";
import { mockOrganization1 } from "../../../__mocks__/organization";

describe("Sidebar Navigation", () => {
  const currentOrganization = mockOrganization1;

  beforeEach(() => {
    // Mock useState for CurrentDataProvider context - return our mocked data
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [currentOrganization, jest.fn()]);

    render(
      <CurrentDataProvider>
        <SidebarNavigation />
      </CurrentDataProvider>,
    );
  });

  afterEach(() => {
    // Cleanup after each test
    jest.clearAllMocks();
  });

  it("renders links", () => {
    const links = screen.getAllByRole("link");

    expect(links[0].textContent).toEqual("Organizations");
    expect(links[0].href).toContain("/dashboard/organizations");

    expect(links[1].textContent).toEqual("Projects");
    expect(links[1].href).toContain("/dashboard/projects");

    expect(links[2].textContent).toEqual("Team");
    expect(links[2].href).toContain("/dashboard/team");

    expect(links[3].textContent).toEqual("Log Out");
  });

  it("renders current organization name", () => {
    const name = screen.getByTestId("current-org-name");

    expect(name).toHaveTextContent(currentOrganization.name);
  });
});
