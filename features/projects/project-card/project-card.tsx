import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectReq } from "@/api/projects";
import type { ProjectWithTasks } from "@/typings/project.types";
import { ProjectTable } from "../project-table";
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  EditIcon,
  TrashIcon,
} from "@/features/ui";
import { sanitizeProject, titleCase } from "@/app/lib/helpers";
import classNames from "classnames";
import styles from "./project-card.module.scss";
import { queryKeys } from "@/api/query-keys";
import { ProjectEditForm } from "../project-edit-form";

type ProjectCardProps = {
  className?: string;
  project: ProjectWithTasks;
  isManagerProp?: boolean;
  projectIdx: number;
};

export function ProjectCard({
  className,
  project,
  isManagerProp,
  projectIdx,
}: ProjectCardProps) {
  const [enableEditForm, setEnableEditForm] = useState(false);

  // Override with isManagerProp
  const isManager =
    isManagerProp !== undefined ? isManagerProp : project.isManager;

  const queryClient = useQueryClient();

  const deleteProjectMutation = useMutation({
    mutationFn: () => {
      // Get rid of extra keys, like isManager, tasks
      const sanitizedProject = sanitizeProject(project);
      return deleteProjectReq(sanitizedProject);
    },
    onSuccess: () => {
      // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [queryKeys.projects] });
    },
  });

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.headerRow}>
        <div className={styles.h2}>
          <h2 data-testid={`project-card-title-${projectIdx}`}>
            {titleCase(project.name)}
          </h2>
        </div>
        <div className={styles.editButtons}>
          {isManager && (
            <>
              <Button
                size={ButtonSize.Medium}
                color={ButtonColor.White}
                variant={ButtonVariant.IconOnly}
                className={styles.editButton}
                onPress={() => setEnableEditForm(!enableEditForm)}
                data-testid="project-edit-button"
              >
                <EditIcon />
              </Button>
              <Button
                size={ButtonSize.Medium}
                color={ButtonColor.DestructiveSecondary}
                variant={ButtonVariant.IconOnly}
                className={styles.editButton}
                onPress={() => deleteProjectMutation.mutate()}
                isDisabled={deleteProjectMutation.isPending}
                data-testid="project-delete-button"
              >
                <TrashIcon />
              </Button>
            </>
          )}
        </div>
      </div>
      {enableEditForm && (
        <div className={styles.editFormContainer}>
          <ProjectEditForm project={project} className={styles.editForm} />
        </div>
      )}
      {project.tasks.length > 0 ? (
        <ProjectTable
          project={project}
          isManagerProp={isManagerProp}
          projectIdx={projectIdx}
        />
      ) : (
        <p>
          This project has no tasks. Create one to start managing this project.
        </p>
      )}
    </div>
  );
}
