import prisma from "@/lib/prisma";
import type { User } from "@prisma/client";

export const findUser = async (id: string): Promise<User | null> =>
  prisma.user.findUnique({
    where: { id: id },
  });

export const findUserByEmail = async (email: string): Promise<User | null> =>
  prisma.user.findUnique({
    where: { email: email },
  });

export async function fetchTeam(orgId: string) {
  try {
    const organizationWithUsers = await prisma.organization.findUnique({
      where: {
        id: orgId,
      },
      include: {
        // Members are OrganizationUsers (join table)
        members: {
          include: {
            // Include the actual User from the join table (Organization User)
            user: true,
          },
        },
      },
    });

    if (!organizationWithUsers) throw new Error("Unable to find organization.");

    // Map over members (OrganizationUsers) of the organization and exclude unwanted keys
    const users = organizationWithUsers.members.map((member) => {
      const user = { ...member.user, role: member.role };
      return excludeUser(user, ["emailVerified"]);
    });

    return users;
  } catch (error) {
    console.error("Database Error:", error);
    return {
      errors: error,
      message: "Failed to fetch the user's organizations.",
    };
  }
}

// Exclude keys from user
// https://www.prisma.io/docs/orm/prisma-client/queries/excluding-fields
export function excludeUser<
  User extends { [key: string]: unknown },
  Key extends keyof User,
>(user: User, keys: Key[]): Omit<User, Key> {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key as Key)),
  ) as Omit<User, Key>;
}
