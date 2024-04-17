import React from "react";
import type { ProjectWithTasks } from "@/typings/project.types";
import { ProjectTableRow } from "./project-table-row";
import classNames from "classnames";
import styles from "./project-table.module.scss";
// import { capitalize } from "lodash";

type ProjectTableProps = {
  className?: string;
  project: ProjectWithTasks;
};

export function ProjectTable({ className, project }: ProjectTableProps) {
  return (
    <div className={classNames(styles.container, className)}>
      {project.tasks.map((task, idx) => (
        <ProjectTableRow task={task} key={idx} />
      ))}
    </div>
  );
}
