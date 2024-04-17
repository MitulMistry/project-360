import prisma from "@/lib/prisma";
import { z } from "zod";
import type { OrganizationUser } from "@prisma/client";
import { findUserByEmail } from "./users";
import { authenticateOwner, findOrganizationUser } from "./organizations";
import { Role } from "@prisma/client";

const FormSchema = z.object({
  organizationId: z.string(),
  userId: z.string(),
  currentUserEmail: z.string().email({ message: "Invalid email address" }),
  role: z.nativeEnum(Role),
});

const UpdateOrganizationUser = FormSchema;

export async function updateOrganizationUser(
  formData: Omit<OrganizationUser, "joinedAt"> & { currentUserEmail: string },
) {
  // Validate form using Zod
  const validatedFields = UpdateOrganizationUser.safeParse({
    organizationId: formData.organizationId,
    userId: formData.userId,
    currentUserEmail: formData.currentUserEmail,
    role: formData.role,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update OrganizationUser.",
    };
  }

  const { organizationId, userId, currentUserEmail, role } =
    validatedFields.data;

  try {
    const currentUser = await findUserByEmail(currentUserEmail);
    if (!currentUser) throw new Error("Invalid user.");

    // Only update the organizationUser if user is an owner
    const currentOrganizationUser = await findOrganizationUser(
      currentUser.id,
      organizationId,
    );
    authenticateOwner(currentOrganizationUser);

    return await prisma.organizationUser.update({
      where: {
        // Use compound unique identifier
        userId_organizationId: {
          userId: userId,
          organizationId: organizationId,
        },
      },
      data: {
        role: role,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      errors: error,
      message: "Failed to update the organization.",
    };
  }
}
