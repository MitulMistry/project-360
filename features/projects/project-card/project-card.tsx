import React from "react";
import type { ProjectWithTasks } from "@/typings/project.types";
import classNames from "classnames";
import styles from "./project-card.module.scss";
import { titleCase } from "@/app/lib/helpers";
import { ProjectTable } from "../project-table";
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  EditIcon,
  TrashIcon,
} from "@/features/ui";

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
  // Override with isManagerProp
  const isManager =
    isManagerProp !== undefined ? isManagerProp : project.isManager;

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
                // onPress={() => setEnableEditForm(!enableEditForm)}
                data-testid="project-edit-button"
              >
                <EditIcon />
              </Button>
              <Button
                size={ButtonSize.Medium}
                color={ButtonColor.DestructiveSecondary}
                variant={ButtonVariant.IconOnly}
                className={styles.editButton}
                // onPress={() => deleteOrgMutation.mutate()}
                // isDisabled={deleteOrgMutation.isPending}
                data-testid="project-delete-button"
              >
                <TrashIcon />
              </Button>
            </>
          )}
        </div>
      </div>
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
