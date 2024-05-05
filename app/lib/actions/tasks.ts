import prisma from "@/lib/prisma";
import { z } from "zod";
import { authenticateManager, findOrganizationUser } from "./organizations";
import { checkIfManager, findUserByEmail } from "./users";
import { Priority, Status, Task } from "@prisma/client";
import { findProject } from "./projects";

const FormSchema = z.object({
  id: z.string(),
  userEmail: z.string().email({ message: "Invalid email address" }),
  projectId: z.string(),
  assigneeId: z.string().optional(),
  name: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(100, { message: "Must be 100 or fewer characters long" })
    .optional(),
  status: z.nativeEnum(Status),
  priority: z.nativeEnum(Priority),
  timeEstimate: z.number().optional(),
  timeEstimateUnits: z.string().optional(),
  dueDate: z.date().optional(),
});

const CreateTask = FormSchema.omit({ id: true });

export async function createTask(
  formData: Omit<Task, "id" | "createdAt | updatedAt"> & { userEmail: string },
) {
  // Validate form using Zod
  const validatedFields = CreateTask.safeParse({
    name: formData.name,
    userEmail: formData.userEmail,
    assigneeId: formData.assigneeId,
    projectId: formData.projectId,
    status: formData.status,
    priority: formData.priority,
    timeEstimate: formData.timeEstimate,
    timeEstimateUnits: formData.timeEstimateUnits,
    dueDate: formData.dueDate,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Task.",
    };
  }

  const {
    name,
    userEmail,
    assigneeId,
    projectId,
    status,
    priority,
    timeEstimate,
    timeEstimateUnits,
    dueDate,
  } = validatedFields.data;

  try {
    const user = await findUserByEmail(userEmail);
    if (!user) throw new Error("Unable to find user.");

    const project = await findProject(projectId);
    if (!project) throw new Error("Unable to find project.");

    if (!checkIfManager(user.id, project.organizationId))
      throw new Error("Unauthorized - insufficient permissions.");

    const task: Task | null = await prisma.task.create({
      data: {
        name,
        assigneeId,
        projectId,
        status,
        priority,
        timeEstimate,
        timeEstimateUnits,
        dueDate,
      },
    });

    return task;
  } catch (error) {
    console.error("Database Error:", error);
    return {
      errors: error,
      message: "Failed to create the task.",
    };
  }
}

const UpdateTask = FormSchema;

export async function updateTask(
  formData: Omit<Task, "createdAt"> & { userEmail: string },
) {
  // Validate form using Zod
  const validatedFields = UpdateTask.safeParse({
    id: formData.id,
    name: formData.name,
    userEmail: formData.userEmail,
    assigneeId: formData.assigneeId,
    projectId: formData.projectId,
    status: formData.status,
    priority: formData.priority,
    timeEstimate: formData.timeEstimate,
    timeEstimateUnits: formData.timeEstimateUnits,
    dueDate: formData.dueDate,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Task.",
    };
  }

  const {
    id,
    name,
    userEmail,
    assigneeId,
    projectId,
    status,
    priority,
    timeEstimate,
    timeEstimateUnits,
    dueDate,
  } = validatedFields.data;

  try {
    const user = await findUserByEmail(userEmail);
    if (!user) throw new Error("Invalid user.");

    const project = await findProject(projectId);
    if (!project) throw new Error("Unable to find project.");

    // Only update the task if user is a manager (or owner)
    const organizationUser = await findOrganizationUser(
      user.id,
      project.organizationId,
    );
    authenticateManager(organizationUser);

    return await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        name,
        assigneeId,
        projectId,
        status,
        priority,
        timeEstimate,
        timeEstimateUnits,
        dueDate,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      errors: error,
      message: "Failed to update the task.",
    };
  }
}

const DeleteTask = FormSchema.omit({
  name: true,
  projectId: true,
  status: true,
  priority: true,
});

export async function deleteTask(
  formData: Omit<
    Task,
    "name" | "createdAt" | "updatedAt" | "projectId" | "status" | "priority"
  > & {
    userEmail: string;
  },
) {
  // Validate form using Zod
  const validatedFields = DeleteTask.safeParse({
    id: formData.id,
    userEmail: formData.userEmail,
  });
  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Delete Task.",
    };
  }

  const { id, userEmail } = validatedFields.data;

  try {
    const user = await findUserByEmail(userEmail);
    if (!user) throw new Error("Invalid user.");

    const task = await findTask(id);
    if (!task) throw new Error("Invalid task.");

    const project = await findProject(task.projectId);
    if (!project) throw new Error("Unable to find project.");

    // Only delete the task if user is a manager
    const organizationUser = await findOrganizationUser(
      user.id,
      project.organizationId,
    );
    authenticateManager(organizationUser);

    await prisma.task.delete({
      where: {
        id: id,
      },
    });

    return {
      message: "Successfully deleted task.",
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      errors: error,
      message: "Failed to delete the task.",
    };
  }
}

/*--- Helper functions ---*/

export const findTask = async (id: string): Promise<Task | null> =>
  prisma.task.findUnique({
    where: { id: id },
  });
