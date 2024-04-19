import React from "react";
import type { TaskWithAssignee } from "@/typings/task.types";
import classNames from "classnames";
import styles from "./project-table-row.module.scss";
import { UserAvatar, UserAvatarSize } from "@/features/team";
import { capitalize } from "lodash";
import { formatDate } from "@/app/lib/helpers";
import {
  priorityColors,
  StatusButton,
  StatusButtonSize,
  statusColors,
} from "@/features/ui/status-button";

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
        <div className={styles.cell} data-testid={`user-name-${idx}`}>
          <UserAvatar
            size={UserAvatarSize.Small}
            className={styles.avatar}
            imgUrl={task.assignee.image || undefined}
          />
          {capitalize(task.assignee.name || undefined)}
        </div>
      </td>
      <td className={styles.td} data-testid={`task-status-${idx}`}>
        <StatusButton
          size={StatusButtonSize.Medium}
          items={statusColors}
          initialItem={task.status}
          isActive={isManager}
        />
      </td>
      <td className={styles.td} data-testid={`task-priority-${idx}`}>
        <StatusButton
          size={StatusButtonSize.Medium}
          items={priorityColors}
          initialItem={task.priority}
          isActive={isManager}
        />
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
