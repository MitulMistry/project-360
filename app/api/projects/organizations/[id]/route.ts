import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import { NextResponse } from "next/server";
import { findUserByEmail } from "@/app/lib/actions/users";
import { fetchOrgProjects } from "@/app/lib/actions/projects";
import {
  unauthorizedResponse,
  failedResponse,
  checkForErrors,
} from "../../../lib/response-helpers";
import {
  findOrganization,
  findOrganizationUser,
} from "@/app/lib/actions/organizations";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorizedResponse;
  if (!session?.user?.email) return failedResponse();

  // Check if organization exists
  const organization = await findOrganization(params.id);
  if (!organization) return failedResponse();

  // Check if user exists + get user id
  const user = await findUserByEmail(session.user.email);
  if (!user) return failedResponse();

  // Check if join table exists (so user is a member of the organization)
  const orgUser = await findOrganizationUser(user.id, organization.id);
  if (!orgUser) return unauthorizedResponse;

  // Fetch the projects
  const projects = await fetchOrgProjects(user.id, organization.id);
  if (checkForErrors(projects)) return failedResponse();

  return NextResponse.json(
    {
      success: true,
      message: "List data projects.",
      data: projects,
    },
    {
      status: 200,
    },
  );
}
