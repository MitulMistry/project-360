import type { Project } from "@prisma/client";
import { Status, Priority } from "@prisma/client";
import type { ProjectWithTasks } from "@/typings/project.types";
import type { TaskWithAssignee } from "@/typings/task.types";
import { mockOrganization1 } from "./organization";
import { mockUsersSimple1 } from "./user";

const date = new Date();

export const mockProject1: Project = {
  id: "clud0qi6g000008l49ga1y2d9",
  organizationId: mockOrganization1.id,
  createdAt: new Date(date.getDate()),
  name: "Design Interface",
};

export const mockProjectWithTasks1: ProjectWithTasks = {
  id: "clud0qi6g000008t49ga1g1d9",
  organizationId: mockOrganization1.id,
  createdAt: new Date(date.getDate()),
  name: "Design Interface",
  tasks: [
    <TaskWithAssignee>{
      id: "clud0qi6g000008l49ga1y2d0",
      createdAt: new Date(date.getDate()),
      updatedAt: new Date(date.getDate()),
      projectId: "clud0qi6g000008t49ga1g1d9",
      assigneeId: mockUsersSimple1[0].id,
      name: "Create Figma design",
      status: Status.READY,
      priority: Priority.HIGH,
      timeEstimate: 20,
      timeEstimateUnits: "hrs",
      dueDate: new Date(date.getDate() + 7),
      assignee: mockUsersSimple1[0],
    },
    <TaskWithAssignee>{
      id: "clud0qi6g000008l49ga1y2d0",
      createdAt: new Date(date.getDate()),
      updatedAt: new Date(date.getDate()),
      projectId: "clud0qi7g000008t49ga1g1d9",
      assigneeId: mockUsersSimple1[1].id,
      name: "Map out user flow",
      status: Status.INPROGRESS,
      priority: Priority.LOW,
      timeEstimate: 5,
      timeEstimateUnits: "hrs",
      dueDate: new Date(date.getDate() + 3),
      assignee: mockUsersSimple1[1],
    },
    <TaskWithAssignee>{
      id: "clud0qi6g000008l49ga1y2d0",
      createdAt: new Date(date.getDate()),
      updatedAt: new Date(date.getDate()),
      projectId: "clud0qi7g000008t49ga1g1d9",
      assigneeId: mockUsersSimple1[2].id,
      name: "Create design mockups for splash pages",
      status: Status.DONE,
      priority: Priority.MEDIUM,
      timeEstimate: 10,
      timeEstimateUnits: "hrs",
      dueDate: new Date(date.getDate() + 1),
      assignee: mockUsersSimple1[2],
    },
  ],
};

export const mockProjectWithTasks2: ProjectWithTasks = {
  id: "clud0qi6g000008t49ga1g1d1",
  organizationId: mockOrganization1.id,
  createdAt: new Date(date.getDate()),
  name: "Implement authentication",
  tasks: [
    <TaskWithAssignee>{
      id: "clud0qi6g000008l49ga1y2d0",
      createdAt: new Date(date.getDate()),
      updatedAt: new Date(date.getDate()),
      projectId: "clud0qi6g000008t43ga1g1d1",
      assigneeId: mockUsersSimple1[3].id,
      name: "Research authentication systems",
      status: Status.INPROGRESS,
      priority: Priority.MEDIUM,
      timeEstimate: 5,
      timeEstimateUnits: "hrs",
      dueDate: new Date(date.getDate() + 4),
      assignee: mockUsersSimple1[3],
    },
    <TaskWithAssignee>{
      id: "clud0qi6g000008l49ga1y2d0",
      createdAt: new Date(date.getDate()),
      updatedAt: new Date(date.getDate()),
      projectId: "clud0qi7g000008t46ga1g1d1",
      assigneeId: mockUsersSimple1[4].id,
      name: "Add OAuth",
      status: Status.STUCK,
      priority: Priority.CRITICAL,
      timeEstimate: 20,
      timeEstimateUnits: "hrs",
      dueDate: new Date(date.getDate() + 10),
      assignee: mockUsersSimple1[4],
    },
  ],
};
