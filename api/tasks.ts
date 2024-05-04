import { axios } from "./axios";
import type { Task } from "@prisma/client";

const ENDPOINT = "/api/tasks";

export async function createTaskReq(
  task: Omit<Task, "id" | "createdAt" | "updatedAt">,
) {
  const data = await axios
    .post(ENDPOINT, task)
    .then<Task>((response) => response.data.data);
  return data;
}

export async function updateTaskReq(
  task: Omit<Task, "createdAt" | "updatedAt">,
) {
  const data = await axios
    .patch(`${ENDPOINT}/${task.id}`, task)
    .then<Task>((response) => response.data.data);
  return data;
}

export async function deleteTaskReq(
  task: Omit<Task, "createdAt" | "updatedAt">,
) {
  const data = await axios
    .delete(`${ENDPOINT}/${task.id}`, { data: task })
    .then<Task>((response) => response.data.data);
  return data;
}
