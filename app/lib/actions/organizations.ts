import prisma from "@/lib/prisma";

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
