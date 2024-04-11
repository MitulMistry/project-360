import type { Organization } from "@prisma/client";
import type { OrganizationWithOwner } from "@/typings/organization.types";

const date = new Date();

export const mockOrganization1: Organization = {
  id: "clud0qi6g000008l49ga1g1d9",
  createdAt: new Date(date.getDate()),
  name: "Development Team",
};

export const mockOrganizationWithOwner1: OrganizationWithOwner = {
  id: "clud0qi6g000008l49ga1g1d9",
  createdAt: new Date(date.getDate()),
  name: "Development Team",
  isOwner: false,
};

export const mockOrganizationWithOwner2: OrganizationWithOwner = {
  id: "clud0qi6g000008l49ga1g1d9",
  createdAt: new Date(date.getDate()),
  name: "Development Team",
  isOwner: true,
};
