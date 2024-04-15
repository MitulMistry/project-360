"use client";

import { useContext, useEffect } from "react";
import { CurrentDataContext } from "@/app/context/current-data-provider";
import { Routes } from "@/config/routes";
import { useRouter } from "next/navigation";
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
  // Grab the current organization from context provider
  const { currentOrganization } = useContext(CurrentDataContext);
  const router = useRouter();

  // Redirect to organizations selection page if no organization currently selected
  useEffect(() => {
    if (!currentOrganization) {
      router.push(Routes.organizations);
    }
    // router.push() does not change between renders, so it doesn't need to
    // be listed as a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrganization]);

  const { isPending, isFetching, isError, data, error } = useGetTeam(
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
      {/* isPending for initial request, isFetching for invalidated query (refetch) */}
      {isPending || isFetching ? (
        <LoadingIndicator
          size={LoadingIndicatorSize.Large}
          className={styles.loadingIndicator}
        />
      ) : (
        <div className={styles.main}>
          <TeamTable users={data} isOwner={currentOrganization?.isOwner} />
        </div>
      )}
    </div>
  );
}
