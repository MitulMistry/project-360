import { axios } from "./axios";
import type { ProjectWithTasks } from "@/typings/project.types";

const ENDPOINT = "/api/projects";

export async function getProjectsReq(orgId: string) {
  const data = await axios
    .get(`${ENDPOINT}/organizations/${orgId}`)
    .then<ProjectWithTasks[]>((response) => response.data.data);
  return data;
}
