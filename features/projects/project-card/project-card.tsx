import React from "react";
import type { ProjectWithTasks } from "@/typings/project.types";
import classNames from "classnames";
import styles from "./project-card.module.scss";
import { capitalize } from "lodash";
import { ProjectTable } from "../project-table";

type ProjectCardProps = {
  className?: string;
  project: ProjectWithTasks;
  isManagerProp?: boolean;
};

export function ProjectCard({
  className,
  project,
  isManagerProp,
}: ProjectCardProps) {
  return (
    <div className={classNames(styles.container, className)}>
      <h2>{capitalize(project.name)}</h2>
      <ProjectTable project={project} isManagerProp={isManagerProp} />
    </div>
  );
}
