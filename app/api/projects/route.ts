import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import { NextResponse } from "next/server";
import { createProject } from "@/app/lib/actions/projects";
import {
  unauthorizedResponse,
  failedResponse,
  checkForErrors,
} from "../lib/response-helpers";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorizedResponse;
  if (!session?.user?.email) return failedResponse();

  const formData = await request.json();
  formData.userEmail = session.user.email;

  const project = await createProject(formData);
  if (checkForErrors(project)) return failedResponse(project);

  return NextResponse.json(
    {
      success: true,
      message: "Project created successfully.",
      data: project,
    },
    { status: 201 },
  );
}
