import { Project as PrismaProject } from "@prisma/client";
import { TaskWithAssignee } from "./task.types";

export type ProjectWithTasks = PrismaProject & { tasks: TaskWithAssignee[] };
