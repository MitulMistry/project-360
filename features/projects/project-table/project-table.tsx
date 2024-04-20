import React from "react";
import type { ProjectWithTasks } from "@/typings/project.types";
import { ProjectTableRow } from "./project-table-row";
import classNames from "classnames";
import styles from "./project-table.module.scss";

type ProjectTableProps = {
  className?: string;
  project: ProjectWithTasks;
  projectIdx?: number;
  isManagerProp?: boolean;
};

export function ProjectTable({
  className,
  project,
  projectIdx = 0,
  isManagerProp,
}: ProjectTableProps) {
  const isManager =
    isManagerProp !== undefined ? isManagerProp : project.isManager;

  return (
    <div className={classNames(styles.container, className)}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={styles.tr}>
            <th
              scope="col"
              className={classNames(
                styles.th,
                isManager && styles.managerEnabled,
              )}
            >
              Task
            </th>
            <th
              scope="col"
              className={classNames(
                styles.th,
                isManager && styles.managerEnabled,
              )}
            >
              Asignee
            </th>
            <th
              scope="col"
              className={classNames(
                styles.th,
                isManager && styles.managerEnabled,
              )}
            >
              Status
            </th>
            <th
              scope="col"
              className={classNames(
                styles.th,
                isManager && styles.managerEnabled,
              )}
            >
              Priority
            </th>
            <th
              scope="col"
              className={classNames(
                styles.th,
                isManager && styles.managerEnabled,
              )}
            >
              Time Estimate
            </th>
            <th
              scope="col"
              className={classNames(
                styles.th,
                isManager && styles.managerEnabled,
              )}
            >
              Due Date
            </th>
            {isManager && (
              <th
                scope="col"
                className={classNames(styles.th, styles.managerEnabled)}
              ></th>
            )}
            {isManager && (
              <th
                scope="col"
                className={classNames(styles.th, styles.managerEnabled)}
              >
                Edit
              </th>
            )}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {project.tasks &&
            project.tasks.map((task, idx) => (
              <ProjectTableRow
                key={`project-task-${idx}`}
                task={task}
                isManager={isManager}
                projectIdx={projectIdx}
                rowIdx={idx}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}
