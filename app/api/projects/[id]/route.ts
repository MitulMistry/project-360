import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import { NextResponse } from "next/server";
import { updateProject, deleteProject } from "@/app/lib/actions/projects";
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

  const project = await updateProject(formData);
  if (checkForErrors(project)) return failedResponse(project);

  return NextResponse.json(
    {
      success: true,
      message: "Project updated successfully.",
      data: project,
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

  const project = await deleteProject(formData);
  if (checkForErrors(project)) return failedResponse(project);

  return NextResponse.json(
    {
      success: true,
      message: "Project deleted successfully.",
    },
    { status: 201 },
  );
}
