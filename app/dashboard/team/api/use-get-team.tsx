"use client";

import { useQuery } from "@tanstack/react-query";
import { getTeamReq } from "@api/users";
import { queryKeys } from "@api/query-keys";

export function useGetTeam(orgId: string) {
  return useQuery({
    queryKey: [queryKeys.team],
    queryFn: () => getTeamReq(orgId),
  });
}
