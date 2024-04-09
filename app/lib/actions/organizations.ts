import prisma from "@/lib/prisma";
import { z } from "zod";
import type { Organization, OrganizationUser } from "@prisma/client";
import { findUserByEmail } from "./users";
import { Role } from "@prisma/client";

const FormSchema = z.object({
  id: z.string(),
  userEmail: z.string().email({ message: "Invalid email address" }),
  name: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
});

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

const CreateOrganization = FormSchema.omit({ id: true });

export async function createOrganization(
  formData: Omit<Organization, "id" | "createdAt"> & { userEmail: string },
) {
  // Validate form using Zod
  const validatedFields = CreateOrganization.safeParse({
    name: formData.name,
    userEmail: formData.userEmail,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Organization.",
    };
  }

  const { name, userEmail } = validatedFields.data;

  try {
    const user = await findUserByEmail(userEmail);

    const organization: Organization | null = await prisma.organization.create({
      data: {
        name: name,
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

const JoinOrganization = FormSchema.omit({ name: true });

export async function joinOrganization(
  formData: Omit<Organization, "name" | "createdAt"> & { userEmail: string },
) {
  // Validate form using Zod
  const validatedFields = JoinOrganization.safeParse({
    id: formData.id,
    userEmail: formData.userEmail,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Join Organization.",
    };
  }

  const { id, userEmail } = validatedFields.data;

  try {
    const user = await findUserByEmail(userEmail);
    const organization = await findOrganization(id);

    if (user && organization) {
      await prisma.organizationUser.create({
        data: {
          userId: user?.id,
          organizationId: organization?.id,
          role: Role.ASSIGNEE,
        },
      });
    } else {
      throw new Error("Failed to create organizationUser.");
    }

    return organization;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to join the organization.");
  }
}

const LeaveOrganization = FormSchema.omit({ name: true });

export async function leaveOrganization(
  formData: Omit<Organization, "name" | "createdAt"> & { userEmail: string },
) {
  // Validate form using Zod
  const validatedFields = LeaveOrganization.safeParse({
    id: formData.id,
    userEmail: formData.userEmail,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Leave Organization.",
    };
  }

  const { id, userEmail } = validatedFields.data;

  try {
    const user = await findUserByEmail(userEmail);
    const organization = await findOrganization(id);

    if (user && organization) {
      const organizationUser = await findOrganizationUser(
        user.id,
        organization.id,
      );
      // Can't leave organization if owner
      if (!organizationUser || organizationUser.role === Role.OWNER)
        throw new Error("Failed to leave the organization.");

      // Syntax for deleting join table (organizationUser doesn't have id)
      await prisma.organizationUser.delete({
        where: {
          userId_organizationId: {
            userId: organizationUser.userId,
            organizationId: organizationUser.organizationId,
          },
        },
      });
    } else {
      throw new Error("Failed to delete organizationUser.");
    }

    return {
      message: "Successfully left organization.",
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to leave the organization.");
  }
}

const UpdateOrganization = FormSchema;

export async function updateOrganization(
  formData: Omit<Organization, "createdAt"> & { userEmail: string },
) {
  // Validate form using Zod
  const validatedFields = UpdateOrganization.safeParse({
    id: formData.id,
    name: formData.name,
    userEmail: formData.userEmail,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Organization.",
    };
  }

  const { id, name, userEmail } = validatedFields.data;

  try {
    const user = await findUserByEmail(userEmail);
    if (!user) throw new Error("Invalid user.");

    // Only update the organization if user is an owner
    const organizationUser = await findOrganizationUser(user.id, id);
    authenticateOwner(organizationUser);

    return await prisma.organization.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update the organization.");
  }
}

const DeleteOrganization = FormSchema.omit({ name: true });

export async function deleteOrganization(
  formData: Omit<Organization, "name" | "createdAt"> & { userEmail: string },
) {
  // Validate form using Zod
  const validatedFields = DeleteOrganization.safeParse({
    id: formData.id,
    userEmail: formData.userEmail,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Delete Organization.",
    };
  }

  const { id, userEmail } = validatedFields.data;

  try {
    const user = await findUserByEmail(userEmail);
    if (!user) throw new Error("Invalid user.");

    // Only delete the organization if user is an owner
    const organizationUser = await findOrganizationUser(user.id, id);
    authenticateOwner(organizationUser);

    await prisma.organization.delete({
      where: {
        id: id,
      },
    });

    return {
      message: "Successfully deleted organization.",
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete the organization.");
  }
}

/*--- Helper functions ---*/

export const findOrganization = async (
  id: string,
): Promise<Organization | null> =>
  prisma.organization.findUnique({
    where: { id: id },
  });

export const findOrganizationUser = async (
  userId: string,
  organizationId: string,
): Promise<OrganizationUser | null> =>
  prisma.organizationUser.findFirstOrThrow({
    where: { userId: userId, organizationId: organizationId },
  });

// Use this in a try/catch block
export const authenticateOwner = (
  organizationUser: OrganizationUser | null,
) => {
  if (!organizationUser) throw new Error("User not member of organization.");
  if (organizationUser.role !== Role.OWNER) throw new Error("Unauthorized.");
};
