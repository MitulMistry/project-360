import prisma from "@/lib/prisma";
import { z } from "zod";
import { authenticateManager, findOrganizationUser } from "./organizations";
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

const UpdateProject = FormSchema;

export async function updateProject(
  formData: Omit<Project, "createdAt"> & { userEmail: string },
) {
  // Validate form using Zod
  const validatedFields = UpdateProject.safeParse({
    id: formData.id,
    name: formData.name,
    userEmail: formData.userEmail,
    organizationId: formData.organizationId,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Organization.",
    };
  }

  const { id, name, userEmail, organizationId } = validatedFields.data;

  try {
    const user = await findUserByEmail(userEmail);
    if (!user) throw new Error("Invalid user.");

    // Only update the project if user is a manager (or owner)
    const organizationUser = await findOrganizationUser(
      user.id,
      organizationId,
    );
    authenticateManager(organizationUser);

    return await prisma.project.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      errors: error,
      message: "Failed to update the project.",
    };
  }
}

const DeleteProject = FormSchema.omit({ name: true });

export async function deleteProject(
  formData: Omit<Project, "name" | "createdAt"> & { userEmail: string },
) {
  // Validate form using Zod
  const validatedFields = DeleteProject.safeParse({
    id: formData.id,
    userEmail: formData.userEmail,
    organizationId: formData.organizationId,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Delete Project.",
    };
  }

  const { id, userEmail, organizationId } = validatedFields.data;

  try {
    const user = await findUserByEmail(userEmail);
    if (!user) throw new Error("Invalid user.");

    // Only delete the project if user is a manager
    const organizationUser = await findOrganizationUser(
      user.id,
      organizationId,
    );
    authenticateManager(organizationUser);

    await prisma.project.delete({
      where: {
        id: id,
      },
    });

    return {
      message: "Successfully deleted project.",
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      errors: error,
      message: "Failed to delete the project.",
    };
  }
}

/*--- Helper functions ---*/

export const findProject = async (id: string): Promise<Project | null> =>
  prisma.project.findUnique({
    where: { id: id },
  });
