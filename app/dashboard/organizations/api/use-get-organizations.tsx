"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrganizationsReq } from "@api/organizations";
import { queryKeys } from "@api/query-keys";

export function useGetOrganizations() {
  return useQuery({
    queryKey: [queryKeys.organizations],
    queryFn: getOrganizationsReq,
  });
}
