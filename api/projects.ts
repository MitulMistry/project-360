import { axios } from "./axios";
import type { Project } from "@prisma/client";
import type { ProjectWithTasks } from "@/typings/project.types";

const ENDPOINT = "/api/projects";

export async function getProjectsReq(orgId: string) {
  const data = await axios
    .get(`${ENDPOINT}/organizations/${orgId}`)
    .then<ProjectWithTasks[]>((response) => response.data.data);
  return data;
}

export async function createProjectReq(
  project: Omit<Project, "id" | "createdAt">,
) {
  const data = await axios
    .post(ENDPOINT, project)
    .then<Project>((response) => response.data.data);
  return data;
}
