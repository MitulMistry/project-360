import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import { NextResponse } from "next/server";
import { createTask } from "@/app/lib/actions/tasks";
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

  const task = await createTask(formData);
  if (checkForErrors(task)) return failedResponse(task);

  return NextResponse.json(
    {
      success: true,
      message: "Task created successfully.",
      data: task,
    },
    { status: 201 },
  );
}
