"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrganizationsReq } from "@api/organizations";

export function useGetOrganizations() {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizationsReq,
  });
}
