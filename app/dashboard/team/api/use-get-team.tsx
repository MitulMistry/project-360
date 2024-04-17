"use client";

import { useQuery } from "@tanstack/react-query";
import { getTeamReq } from "@api/users";

export function useGetTeam(orgId: string) {
  return useQuery({
    queryKey: ["team"],
    queryFn: () => getTeamReq(orgId),
  });
}
