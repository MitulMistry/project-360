import prisma from "@/lib/prisma";
import { z } from "zod";
import type { User, Organization, OrganizationUser } from "@prisma/client";
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
    const user: User | null = await prisma.user.findUnique({
      where: { email: userEmail },
    });

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
    const user: User | null = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    const organization: Organization | null =
      await prisma.organization.findUnique({
        where: { id: id },
      });

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
    const user: User | null = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    const organizationUser: OrganizationUser | null =
      await prisma.organizationUser.findFirstOrThrow({
        where: { userId: user?.id, organizationId: id },
      });

    // Only update the organization if user is an owner
    let organization;
    if (organizationUser.role === Role.OWNER) {
      organization = await prisma.organization.update({
        where: {
          id: id,
        },
        data: {
          name: name,
        },
      });
    } else {
      throw new Error("Failed to update organization.");
    }

    return organization;
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
    const user: User | null = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    const organizationUser: OrganizationUser | null =
      await prisma.organizationUser.findFirstOrThrow({
        where: { userId: user?.id, organizationId: id },
      });

    // Only delete the organization if user is an owner
    if (organizationUser.role === Role.OWNER) {
      await prisma.organization.delete({
        where: {
          id: id,
        },
      });
    } else {
      throw new Error("Failed to delete organization.");
    }

    return null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete the organization.");
  }
}

// const findUser = async (email: string): Promise<User | null> =>
//   prisma.user.findUnique({
//     where: { email: email },
//   });
