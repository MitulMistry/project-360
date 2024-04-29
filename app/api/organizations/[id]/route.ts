import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import { NextResponse } from "next/server";
import {
  updateOrganization,
  deleteOrganization,
} from "@/app/lib/actions/organizations";
import {
  unauthorizedResponse,
  failedResponse,
  checkForErrors,
} from "../../lib/response-helpers";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorizedResponse;
  if (!session?.user?.email) return failedResponse();

  const formData = await request.json();
  formData.userEmail = session.user.email;
  formData.id = params.id;

  const organization = await updateOrganization(formData);
  if (checkForErrors(organization)) return failedResponse(organization);

  return NextResponse.json(
    {
      success: true,
      message: "Organization updated successfully.",
      data: organization,
    },
    { status: 201 },
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorizedResponse;
  if (!session?.user?.email) return failedResponse();

  const formData = await request.json();
  formData.userEmail = session.user.email;
  formData.id = params.id;

  const organization = await deleteOrganization(formData);
  if (checkForErrors(organization)) return failedResponse(organization);

  return NextResponse.json(
    {
      success: true,
      message: "Organization deleted successfully.",
    },
    { status: 201 },
  );
}
