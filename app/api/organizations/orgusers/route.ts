import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import { NextResponse } from "next/server";
import { updateOrganizationUser } from "@/app/lib/actions/organization-users";
import {
  unauthorizedResponse,
  failedResponse,
  checkForErrors,
} from "../../lib/response-helpers";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorizedResponse;
  if (!session?.user?.email) return failedResponse();

  const formData = await request.json();
  formData.currentUserEmail = session.user.email;

  const organizationUser = await updateOrganizationUser(formData);
  if (checkForErrors(organizationUser)) return failedResponse(organizationUser);

  return NextResponse.json(
    {
      success: true,
      message: "organizationUser updated successfully.",
      data: organizationUser,
    },
    { status: 201 },
  );
}
