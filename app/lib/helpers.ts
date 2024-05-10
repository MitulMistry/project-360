import { OrganizationWithOwner } from "@/typings/organization.types";
import { ProjectWithTasks } from "@/typings/project.types";
import { TaskWithAssignee } from "@/typings/task.types";
import type { Organization, Project, Task } from "@prisma/client";
import { lowerCase, startCase } from "lodash";

// This removes the isOwner key through destructuring
/* eslint-disable @typescript-eslint/no-unused-vars*/
export const sanitizeOrganization = ({
  isOwner,
  ...organization
}: OrganizationWithOwner): Organization => organization;

// This removes the isManager and tasks keys through destructuring
/* eslint-disable @typescript-eslint/no-unused-vars*/
export const sanitizeProject = ({
  tasks,
  isManager,
  ...project
}: ProjectWithTasks): Project => project;

// This removes the assignee key through destructuring (leaves assigneeId)
/* eslint-disable @typescript-eslint/no-unused-vars*/
export const sanitizeTask = ({ assignee, ...task }: TaskWithAssignee): Task =>
  task;

// Will take either DateTime object, or string to convert to DateTime object
export const formatDate = (date: Date | string | null) => {
  if (date === null) return null;
  const convertedDate = date instanceof Date ? date : new Date(date);

  return `${convertedDate.getMonth() + 1}/${convertedDate.getDate()}/${convertedDate.getFullYear()}`;
};

export const titleCase = (str: string | null | undefined) =>
  str ? startCase(lowerCase(str)) : null;

// If value is a number, return it as a number, or else return null
export const parseNumber = (val: string | number | null | undefined) =>
  !isNaN(Number(val)) ? Number(val) : null;

// If string provided can be converted to a date, return the date, or else return null
export const parseDate = (
  dateString: string | null | undefined,
): Date | null => {
  if (!dateString) return null;

  const date = new Date(dateString);

  // If date was successfully created, getTime() should return a valid number
  if (Number.isNaN(date.getTime())) {
    // Date creation was invalid
    return null;
  } else {
    // Date creation was valid
    return date;
  }
};
