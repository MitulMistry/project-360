import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/api/query-keys";
import { deleteTaskReq } from "@/api/tasks";
import type { TaskWithAssignee } from "@/typings/task.types";
import classNames from "classnames";
import styles from "./project-table-row.module.scss";
import { UserAvatar, UserAvatarSize } from "@/features/team";
import { sanitizeTask, titleCase } from "@/app/lib/helpers";
import { formatDate } from "@/app/lib/helpers";
import {
  priorityColors,
  StatusButton,
  StatusButtonSize,
  statusColors,
} from "@/features/ui/status-button";
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  EditIcon,
  TrashIcon,
} from "@features/ui";

type ProjectTableRowProps = {
  className?: string;
  task: TaskWithAssignee;
  isManager?: boolean;
  projectIdx?: number;
  rowIdx: number;
};

export function ProjectTableRow({
  className,
  task,
  isManager = false,
  projectIdx = 0,
  rowIdx,
}: ProjectTableRowProps) {
  const [enableEditForm, setEnableEditForm] = useState(false);
  const idx = `${projectIdx}-${rowIdx}`;

  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: () => {
      // Get rid of extra keys, like Assignee
      const sanitizedTask = sanitizeTask(task);
      return deleteTaskReq(sanitizedTask);
    },
    onSuccess: () => {
      // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [queryKeys.projects] });
    },
  });

  return (
    <tr
      className={classNames(styles.tableRow, className)}
      data-testid={`task-row-${idx}`}
    >
      <th scope="row" className={styles.th} data-testid={`task-name-${idx}`}>
        {titleCase(task.name)}
      </th>
      <td className={styles.td}>
        {task.assignee && (
          <div
            className={styles.cell}
            data-testid={`task-assignee-name-${idx}`}
          >
            <UserAvatar
              size={UserAvatarSize.Small}
              className={styles.avatar}
              imgUrl={task.assignee?.image || undefined}
            />
            {titleCase(task.assignee?.name)}
          </div>
        )}
      </td>
      <td className={styles.td} data-testid={`task-status-${idx}`}>
        <StatusButton
          size={StatusButtonSize.Medium}
          items={statusColors}
          initialItem={task.status}
          isActive={false}
        />
      </td>
      <td className={styles.td} data-testid={`task-priority-${idx}`}>
        <StatusButton
          size={StatusButtonSize.Medium}
          items={priorityColors}
          initialItem={task.priority}
          isActive={false}
        />
      </td>
      <td className={styles.td} data-testid={`task-time-estimate-${idx}`}>
        {task.timeEstimate && `${task.timeEstimate} ${task.timeEstimateUnits}`}
      </td>
      <td className={styles.td} data-testid={`task-due-date-${idx}`}>
        {formatDate(task.dueDate)}
      </td>

      {isManager && (
        <>
          <td className={styles.td} data-testid={`task-submit-${idx}`}>
            {enableEditForm && (
              <Button
                size={ButtonSize.Small}
                color={ButtonColor.Primary}
                // className={styles.submitButton}
                // onPress={() => editMutation.mutate()}
                // isDisabled={editMutation.isPending}
                data-testid={`user-submit-button-${idx}`}
              >
                Submit
              </Button>
            )}
          </td>
          <td className={styles.td} data-testid={`task-edit-${idx}`}>
            <div className={styles.cell}>
              <Button
                size={ButtonSize.Medium}
                color={ButtonColor.White}
                variant={ButtonVariant.IconOnly}
                className={styles.editButton}
                onPress={() => setEnableEditForm(!enableEditForm)}
                data-testid={`task-edit-button-${idx}`}
              >
                <EditIcon />
              </Button>
              <Button
                size={ButtonSize.Medium}
                color={ButtonColor.DestructiveSecondary}
                variant={ButtonVariant.IconOnly}
                className={styles.editButton}
                onPress={() => deleteTaskMutation.mutate()}
                isDisabled={deleteTaskMutation.isPending}
                data-testid={`task-delete-button-${idx}`}
              >
                <TrashIcon />
              </Button>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}
