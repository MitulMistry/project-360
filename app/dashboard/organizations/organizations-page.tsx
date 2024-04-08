"use client";

import { OrganizationList } from "@features/organizations";
import OrganizationsInterface from "./organizations-interface";
import { useGetOrganizations } from "./api/use-get-organizations";

export default function OrganizationsPage() {
  // const { isPending, isError, data, error } = useGetOrganizations();
  const { data } = useGetOrganizations();

  return (
    <>
      <OrganizationsInterface />
      <OrganizationList organizations={data} />
    </>
  );
}
