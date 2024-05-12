"use client";

import { useContext } from "react";
import { CurrentDataContext } from "@/app/context/current-data-provider";
import { OrganizationList } from "@features/organizations";
import OrganizationsInterface from "./organizations-interface";
import { useGetOrganizations } from "./api/use-get-organizations";
import {
  LoadingIndicatorWithContainer,
  LoadingIndicatorSize,
  Notification,
  NotificationColor,
} from "@features/ui";
import styles from "./organizations-page.module.scss";

export default function OrganizationsPage() {
  // Grab the current organization from context provider
  const { currentOrganization } = useContext(CurrentDataContext);
  const message = !currentOrganization
    ? "Please create, join, or select an organization to access the application."
    : null;

  const { isPending, isError, data, error } = useGetOrganizations();

  return (
    <>
      <OrganizationsInterface />
      {(isError || message) && (
        <Notification
          color={
            (isError && NotificationColor.ErrorSolid) ||
            NotificationColor.PrimaryLight
          }
          className={styles.notification}
        >
          {(error && `Error: ${error.message}`) || message}
        </Notification>
      )}
      {isPending ? (
        <LoadingIndicatorWithContainer
          size={LoadingIndicatorSize.Large}
          className={styles.loadingIndicator}
        />
      ) : (
        <OrganizationList organizations={data} />
      )}
    </>
  );
}
