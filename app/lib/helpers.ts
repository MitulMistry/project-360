import { OrganizationWithOwner } from "@/typings/organization.types";
import type { Organization } from "@prisma/client";

// This removes the isOwner key through destructuring
/* eslint-disable @typescript-eslint/no-unused-vars*/
export const sanitizeOrganization = ({
  isOwner,
  ...organization
}: OrganizationWithOwner): Organization => organization;
