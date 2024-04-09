import prisma from "@/lib/prisma";
import { z } from "zod";
import type { User, Organization } from "@prisma/client";
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
