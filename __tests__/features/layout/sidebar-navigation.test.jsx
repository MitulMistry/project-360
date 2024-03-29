import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SidebarNavigation } from "@features/layout";

describe("Sidebar Navigation", () => {
  beforeEach(() => {
    render(<SidebarNavigation />);
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
});
