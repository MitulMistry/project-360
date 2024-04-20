"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectsReq } from "@api/projects";
import { queryKeys } from "@api/query-keys";

export function useGetProjects(orgId: string) {
  return useQuery({
    queryKey: [queryKeys.projects],
    queryFn: () => getProjectsReq(orgId),
  });
}
