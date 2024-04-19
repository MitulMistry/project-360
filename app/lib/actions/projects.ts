import prisma from "@/lib/prisma";
import { findOrganizationUser } from "./organizations";
import { Role } from "@prisma/client";

export async function fetchOrgProjects(userId: string, orgId: string) {
  try {
    const organizationWithProjects = await prisma.organization.findUnique({
      where: {
        id: orgId,
      },
      include: {
        // Members are OrganizationUsers (join table)
        projects: {
          include: {
            // Include the tasks for the project
            tasks: {
              include: {
                // Include the task's assignee (user)
                assignee: true,
              },
            },
          },
        },
      },
    });

    if (!organizationWithProjects)
      throw new Error("Unable to find organization.");

    const orgUser = await findOrganizationUser(userId, orgId);
    if (!orgUser) throw new Error("Unable to find OrganizationUser.");

    // Map over members (OrganizationUsers) of the organization and exclude unwanted keys
    const projects = organizationWithProjects.projects.map((project) => ({
      ...project,
      isManager: orgUser.role === Role.MANAGER || orgUser.role === Role.OWNER,
    }));

    return projects;
  } catch (error) {
    console.error("Database Error:", error);
    return {
      errors: error,
      message: "Failed to fetch the organization's projects.",
    };
  }
}
