"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectsReq } from "@api/projects";

export function useGetProjects(orgId: string) {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjectsReq(orgId),
  });
}
