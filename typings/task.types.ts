import { Task as PrismaTask } from "@prisma/client";
import { UserForOrg } from "./user.types";

export type TaskWithAssignee = PrismaTask & { assignee: UserForOrg };
