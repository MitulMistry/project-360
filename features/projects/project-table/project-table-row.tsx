import React from "react";
import type { TaskWithAssignee } from "@/typings/task.types";
import classNames from "classnames";
import styles from "./project-table.module.scss";
import { capitalize } from "lodash";
import { formatDate } from "@/app/lib/helpers";

type ProjectTableRowProps = {
  className?: string;
  task: TaskWithAssignee;
  isManager?: boolean;
  idx: number;
};

export function ProjectTableRow({
  className,
  task,
  isManager = false,
  idx,
}: ProjectTableRowProps) {
  return (
    <tr
      className={classNames(styles.tableRow, className)}
      data-testid={`task-row-${idx}`}
    >
      <th scope="row" className={styles.th}>
        {capitalize(task.name || undefined)}
      </th>
      <td className={styles.td} data-testid={`task-assignee-${idx}`}>
        {capitalize(task.assignee.name || undefined)}
      </td>
      <td className={styles.td} data-testid={`task-status-${idx}`}>
        {capitalize(task.status || undefined)}
      </td>
      <td className={styles.td} data-testid={`task-priority-${idx}`}>
        {capitalize(task.priority || undefined)}
      </td>
      <td className={styles.td} data-testid={`task-time-estimate-${idx}`}>
        {`${task.timeEstimate} ${task.timeEstimateUnits}`}
      </td>
      <td className={styles.td} data-testid={`task-due-date-${idx}`}>
        {formatDate(task.dueDate)}
      </td>
      {isManager && (
        <td className={styles.td} data-testid={`task-submit-button-${idx}`}>
          Submit
        </td>
      )}
      {isManager && (
        <td className={styles.td} data-testid={`task-edit-button-${idx}`}>
          Edit
        </td>
      )}
    </tr>
  );
}
