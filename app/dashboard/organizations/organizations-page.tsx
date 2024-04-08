"use client";

import { OrganizationList } from "@features/organizations";
import OrganizationsInterface from "./organizations-interface";
import { useGetOrganizations } from "./api/use-get-organizations";
import {
  LoadingIndicator,
  LoadingIndicatorSize,
} from "@/features/ui/loading-indicator";
import styles from "./organizations-page.module.scss";

export default function OrganizationsPage() {
  // const { isPending, isError, data, error } = useGetOrganizations();
  const { isPending, data } = useGetOrganizations();

  return (
    <>
      <OrganizationsInterface />
      {isPending ? (
        <LoadingIndicator
          size={LoadingIndicatorSize.Large}
          className={styles.loadingIndicator}
        />
      ) : (
        <OrganizationList organizations={data} />
      )}
    </>
  );
}
