import React from "react";
import type { ProjectWithTasks } from "@/typings/project.types";
import classNames from "classnames";
import styles from "./project-card.module.scss";
import { titleCase } from "@/app/lib/helpers";
import { ProjectTable } from "../project-table";

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
  return (
    <div className={classNames(styles.container, className)}>
      <h2 data-testid={`project-card-title-${projectIdx}`}>
        {titleCase(project.name)}
      </h2>
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
