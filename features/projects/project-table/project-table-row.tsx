import React from "react";
import type { TaskWithAssignee } from "@/typings/task.types";
import classNames from "classnames";
import styles from "./project-table.module.scss";
// import { capitalize } from "lodash";

type ProjectTableRowProps = {
  className?: string;
  task: TaskWithAssignee;
};

export function ProjectTableRow({ className, task }: ProjectTableRowProps) {
  return (
    <div className={classNames(styles.container, className)}>
      <p>{task.name}</p>
    </div>
  );
}
