"use client";

import { OrganizationList } from "@features/organizations";
import OrganizationsInterface from "./organizations-interface";
import { useGetOrganizations } from "./api/use-get-organizations";
import {
  LoadingIndicator,
  LoadingIndicatorSize,
  Notification,
  NotificationColor,
} from "@features/ui";
import styles from "./organizations-page.module.scss";

export default function OrganizationsPage() {
  const { isPending, isError, data, error } = useGetOrganizations();

  return (
    <>
      <OrganizationsInterface />
      {isError && (
        <Notification color={NotificationColor.ErrorSolid}>
          Error: {error.message}
        </Notification>
      )}
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
