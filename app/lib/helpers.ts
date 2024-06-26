import { OrganizationWithOwner } from "@/typings/organization.types";
import { ProjectWithTasks } from "@/typings/project.types";
import type { Organization, Project } from "@prisma/client";
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

// Will take either DateTime object, or string to convert to DateTime object
export const formatDate = (date: Date | string | null) => {
  if (date === null) return null;
  const convertedDate = date instanceof Date ? date : new Date(date);

  return `${convertedDate.getMonth() + 1}/${convertedDate.getDate()}/${convertedDate.getFullYear()}`;
};

export const titleCase = (str: string | null) =>
  str ? startCase(lowerCase(str)) : null;
