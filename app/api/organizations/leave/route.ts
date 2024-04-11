import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import { NextResponse } from "next/server";
import { leaveOrganization } from "@/app/lib/actions/organizations";
import {
  unauthorizedResponse,
  failedResponse,
  checkForErrors,
} from "../../lib/response-helpers";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorizedResponse;
  if (!session?.user?.email) return failedResponse();

  const formData = await request.json();
  formData.userEmail = session.user.email;

  const organization = await leaveOrganization(formData);
  if (checkForErrors(organization)) return failedResponse(organization);

  return NextResponse.json(
    {
      success: true,
      message: "Organization left successfully.",
      data: organization,
    },
    { status: 201 },
  );
}
