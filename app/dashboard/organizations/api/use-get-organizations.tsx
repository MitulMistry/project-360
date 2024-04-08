"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrganizations } from "@api/organizations";

export function useGetOrganizations() {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });
}
