"use client";

import { useContext } from "react";
import { CurrentDataContext } from "@/app/context/current-data-provider";
import { TeamTable } from "@/features/team";
import { useGetTeam } from "./api/use-get-team";
import {
  LoadingIndicator,
  LoadingIndicatorSize,
  Notification,
  NotificationColor,
} from "@features/ui";
import styles from "./team-page.module.scss";

export function TeamPage() {
  // Grab the current organization from context provider, or let it be overridden by prop.
  const { currentOrganization } = useContext(CurrentDataContext);

  // if (!currentOrganization) // Redirect/please select organization?

  const { isPending, isError, data, error } = useGetTeam(
    currentOrganization?.id || "",
  );

  return (
    <div className={styles.container}>
      <h1>Team</h1>
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
        <div className={styles.main}>
          <TeamTable users={data} />
        </div>
      )}
    </div>
  );
}
