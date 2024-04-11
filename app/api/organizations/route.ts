import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import { NextResponse } from "next/server";
import {
  fetchUserOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from "@/app/lib/actions/organizations";
import {
  unauthorizedResponse,
  failedResponse,
  checkForErrors,
} from "../lib/response-helpers";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorizedResponse;
  if (!session?.user?.email) return failedResponse();

  const organizations = await fetchUserOrganizations(session.user.email);
  if (checkForErrors(organizations)) return failedResponse();

  return NextResponse.json(
    {
      success: true,
      message: "List data organizations.",
      data: organizations,
    },
    {
      status: 200,
    },
  );
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorizedResponse;
  if (!session?.user?.email) return failedResponse();

  const formData = await request.json();
  formData.userEmail = session.user.email;

  const organization = await createOrganization(formData);
  if (checkForErrors(organization)) return failedResponse(organization);

  return NextResponse.json(
    {
      success: true,
      message: "Organization created successfully.",
      data: organization,
    },
    { status: 201 },
  );
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorizedResponse;
  if (!session?.user?.email) return failedResponse();

  const formData = await request.json();
  formData.userEmail = session.user.email;

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

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorizedResponse;
  if (!session?.user?.email) return failedResponse();

  const formData = await request.json();
  formData.userEmail = session.user.email;

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
