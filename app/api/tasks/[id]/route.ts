import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import { NextResponse } from "next/server";
import { updateTask, deleteTask } from "@/app/lib/actions/tasks";
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

  const task = await updateTask(formData);
  if (checkForErrors(task)) return failedResponse(task);

  return NextResponse.json(
    {
      success: true,
      message: "Task updated successfully.",
      data: task,
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

  const task = await deleteTask(formData);
  if (checkForErrors(task)) return failedResponse(task);

  return NextResponse.json(
    {
      success: true,
      message: "Task deleted successfully.",
    },
    { status: 201 },
  );
}
