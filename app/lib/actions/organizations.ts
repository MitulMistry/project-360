import prisma from "@/lib/prisma";
import type { User, Organization } from "@prisma/client";
import { Role } from "@prisma/client";

export async function fetchUserOrganizations(userEmail: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        organizations: {
          // This is the join table, OrganizationUser
          include: {
            organization: true, // This is the actual Organization
          },
        },
      },
    });

    // Map over the organizations to return only the organization objects
    const organizations = user?.organizations.map(
      (orgUser) => orgUser.organization,
    );
    return organizations;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the user's organizations.");
  }
}

export async function createOrganization(orgName: string, userEmail: string) {
  try {
    const user: User | null = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    const organization: Organization | null = await prisma.organization.create({
      data: {
        name: orgName,
      },
    });

    if (user && organization) {
      await prisma.organizationUser.create({
        data: {
          userId: user?.id,
          organizationId: organization?.id,
          role: Role.OWNER,
        },
      });
    } else {
      throw new Error("Failed to create organizationUser.");
    }

    return organization;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create the organization.");
  }
}
