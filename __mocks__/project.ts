import type { Project } from "@prisma/client";
import { Status, Priority } from "@prisma/client";
import type { ProjectWithTasks } from "@/typings/project.types";
import type { TaskWithAssignee } from "@/typings/task.types";
import { mockOrganization1 } from "./organization";
import { mockUsersSimple1 } from "./user";

const date = new Date();
const currentDate = () => new Date(date.getDate());

const date2 = new Date();
const incrementDate = (days: number) => {
  // Set date actually changes the current date in the date object instance
  date2.setDate(date.getDate());
  return new Date(date2.setDate(date.getDate() + days));
};

export const mockProject1: Project = {
  id: "clud0qi6g000008l49ga1y2d9",
  organizationId: mockOrganization1.id,
  createdAt: currentDate(),
  name: "Design Interface",
};

export const mockProjectWithTasks1: ProjectWithTasks = {
  id: "clud0qi6g000008t49ga1g1d9",
  organizationId: mockOrganization1.id,
  createdAt: currentDate(),
  name: "Design Interface",
  isManager: true,
  tasks: [
    <TaskWithAssignee>{
      id: "clud0qi6g000008l49ga1y2d0",
      createdAt: currentDate(),
      updatedAt: currentDate(),
      projectId: "clud0qi6g000008t49ga1g1d9",
      assigneeId: mockUsersSimple1[0].id,
      name: "Create Figma design",
      status: Status.READY,
      priority: Priority.CRITICAL,
      timeEstimate: 20,
      timeEstimateUnits: "hrs",
      dueDate: incrementDate(6),
      assignee: mockUsersSimple1[0],
    },
    <TaskWithAssignee>{
      id: "clud0qi6g000008l49ga1y2d0",
      createdAt: currentDate(),
      updatedAt: currentDate(),
      projectId: "clud0qi7g000008t49ga1g1d9",
      assigneeId: mockUsersSimple1[1].id,
      name: "Map out user flow",
      status: Status.INPROGRESS,
      priority: Priority.LOW,
      timeEstimate: 5,
      timeEstimateUnits: "hrs",
      dueDate: incrementDate(3),
      assignee: mockUsersSimple1[1],
    },
    <TaskWithAssignee>{
      id: "clud0qi6g000008l49ga1y2d0",
      createdAt: currentDate(),
      updatedAt: currentDate(),
      projectId: "clud0qi7g000008t49ga1g1d9",
      assigneeId: mockUsersSimple1[2].id,
      name: "Create design mockups for splash pages",
      status: Status.DONE,
      priority: Priority.HIGH,
      timeEstimate: 10,
      timeEstimateUnits: "hrs",
      dueDate: incrementDate(1),
      assignee: mockUsersSimple1[2],
    },
    <TaskWithAssignee>{
      id: "cluc0qi6g000008l49ga1y2d0",
      createdAt: currentDate(),
      updatedAt: currentDate(),
      projectId: "clud0qi7g000008t49ga1g1d9",
      assigneeId: mockUsersSimple1[3].id,
      name: "Research competing products",
      status: Status.DONE,
      priority: Priority.LOW,
      timeEstimate: 5,
      timeEstimateUnits: "hrs",
      dueDate: incrementDate(3),
      assignee: mockUsersSimple1[3],
    },
    <TaskWithAssignee>{
      id: "clue0qi6g000008l49ga1y2d0",
      createdAt: currentDate(),
      updatedAt: currentDate(),
      projectId: "clud0qi7g000008t49ga1g1d9",
      assigneeId: mockUsersSimple1[4].id,
      name: "Get test user feedback on interface options",
      status: Status.STUCK,
      priority: Priority.MEDIUM,
      timeEstimate: 10,
      timeEstimateUnits: "hrs",
      dueDate: incrementDate(7),
      assignee: mockUsersSimple1[4],
    },
  ],
};

export const mockProjectWithTasks2: ProjectWithTasks = {
  id: "clud0qi6g000008t49ga1g1d1",
  organizationId: mockOrganization1.id,
  createdAt: currentDate(),
  name: "Implement authentication",
  isManager: true,
  tasks: [
    <TaskWithAssignee>{
      id: "clud0qi6g000008l49ga1y2d0",
      createdAt: currentDate(),
      updatedAt: currentDate(),
      projectId: "clud0qi6g000008t43ga1g1d1",
      assigneeId: mockUsersSimple1[3].id,
      name: "Research authentication systems",
      status: Status.INPROGRESS,
      priority: Priority.MEDIUM,
      timeEstimate: 5,
      timeEstimateUnits: "hrs",
      dueDate: incrementDate(4),
      assignee: mockUsersSimple1[3],
    },
    <TaskWithAssignee>{
      id: "clud0qi6g000008l49ga1y2d0",
      createdAt: currentDate(),
      updatedAt: currentDate(),
      projectId: "clud0qi7g000008t46ga1g1d1",
      assigneeId: mockUsersSimple1[4].id,
      name: "Add OAuth",
      status: Status.STUCK,
      priority: Priority.CRITICAL,
      timeEstimate: 20,
      timeEstimateUnits: "hrs",
      dueDate: incrementDate(10),
      assignee: mockUsersSimple1[4],
    },
    <TaskWithAssignee>{
      id: "clud0qi6g000009l49ga1y2d0",
      createdAt: currentDate(),
      updatedAt: currentDate(),
      projectId: "clud0qi7g000008t46ga1g1d1",
      assigneeId: mockUsersSimple1[2].id,
      name: "Implement password hashing",
      status: Status.READY,
      priority: Priority.HIGH,
      timeEstimate: 10,
      timeEstimateUnits: "hrs",
      dueDate: incrementDate(10),
      assignee: mockUsersSimple1[2],
    },
  ],
};
