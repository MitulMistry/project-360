import { Organization as PrismaOrganization } from "@prisma/client";

export type OrganizationWithOwner = PrismaOrganization & {
  isOwner: boolean;
};
