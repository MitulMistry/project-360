"use client";

import { useContext } from "react";
import { CurrentDataContext } from "@/app/context/current-data-provider";
import { useGetTeam } from "@/app/dashboard/team/api/use-get-team";
import type { ProjectWithTasks } from "@/typings/project.types";
import { TaskNewForm } from "./task-new-form";
import { LoadingIndicator, LoadingIndicatorSize } from "@features/ui";
import styles from "./task-new-form-with-team.module.scss";

type TaskNewFormWithTeamProps = {
  project: ProjectWithTasks;
  // users?: UserForOrg[];
  className?: string;
};

export function TaskNewFormWithTeam({
  project,
  className,
}: TaskNewFormWithTeamProps) {
  // Grab the current organization from context provider
  const { currentOrganization } = useContext(CurrentDataContext);

  // { isPending, isFetching, isError, data, error }
  const { isPending, isFetching, data } = useGetTeam(
    currentOrganization?.id || "",
  );

  return (
    <div className={styles.container}>
      {isPending || isFetching || !currentOrganization ? (
        <LoadingIndicator
          size={LoadingIndicatorSize.Small}
          className={styles.loadingIndicator}
        />
      ) : (
        <TaskNewForm project={project} users={data} className={className} />
      )}
    </div>
  );
}
