"use client";

import { useContext, useEffect } from "react";
import { CurrentDataContext } from "@/app/context/current-data-provider";
import { Routes } from "@/config/routes";
import { useRouter } from "next/navigation";
import { ProjectCard } from "@/features/projects";
import { useGetProjects } from "./api/use-get-projects";
import {
  LoadingIndicator,
  LoadingIndicatorSize,
  Notification,
  NotificationColor,
} from "@features/ui";
import styles from "./projects-page.module.scss";
import ProjectsInterface from "./projects-interface";

export function ProjectsPage() {
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

  const { isPending, isFetching, isError, data, error } = useGetProjects(
    currentOrganization?.id || "",
  );

  return (
    <div className={styles.container}>
      <ProjectsInterface />

      {isError && (
        <Notification color={NotificationColor.ErrorSolid}>
          Error: {error.message}
        </Notification>
      )}
      {/* isPending for initial request, isFetching for invalidated query (refetch) */}
      {isPending || isFetching || !currentOrganization ? (
        <LoadingIndicator
          size={LoadingIndicatorSize.Large}
          className={styles.loadingIndicator}
        />
      ) : (
        <div className={styles.main}>
          {data && data.length > 0 ? (
            data?.map((project, idx) => (
              <ProjectCard
                className={styles.projectCard}
                project={project}
                key={idx}
                projectIdx={idx}
              />
            ))
          ) : (
            <div className={styles.noProjects}>
              <p>No projects have been created for this organization yet.</p>
              <p>Create one, or have a manager create one to get started.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
