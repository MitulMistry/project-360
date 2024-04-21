import prisma from "@/lib/prisma";
import { z } from "zod";
import { findOrganizationUser } from "./organizations";
import { checkIfManager, findUserByEmail } from "./users";
import { Project, Role } from "@prisma/client";

const FormSchema = z.object({
  id: z.string(),
  userEmail: z.string().email({ message: "Invalid email address" }),
  organizationId: z.string(),
  name: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
});

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

    // Map over projects of the organization and add whether user is a manager or owner
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

const CreateProject = FormSchema.omit({ id: true });

export async function createProject(
  formData: Omit<Project, "id" | "createdAt"> & { userEmail: string },
) {
  // Validate form using Zod
  const validatedFields = CreateProject.safeParse({
    name: formData.name,
    userEmail: formData.userEmail,
    organizationId: formData.organizationId,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Project.",
    };
  }

  const { name, userEmail } = validatedFields.data;

  try {
    const user = await findUserByEmail(userEmail);
    if (!user) throw new Error("Unable to find user.");

    if (!checkIfManager(user?.id, formData.organizationId))
      throw new Error("Unauthorized - insufficient permissions.");

    const project: Project | null = await prisma.project.create({
      data: {
        name: name,
        organizationId: formData.organizationId,
      },
    });

    return project;
  } catch (error) {
    console.error("Database Error:", error);
    return {
      errors: error,
      message: "Failed to create the organization.",
    };
  }
}
