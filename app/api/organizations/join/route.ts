import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import { NextResponse } from "next/server";
import { joinOrganization } from "@/app/lib/actions/organizations";
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

  const organization = await joinOrganization(formData);
  if (checkForErrors(organization)) return failedResponse(organization);

  return NextResponse.json(
    {
      success: true,
      message: "Organization joined successfully.",
      data: organization,
    },
    { status: 201 },
  );
}
