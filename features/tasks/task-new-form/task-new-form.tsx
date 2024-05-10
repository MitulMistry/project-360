"use client";

import React, { Key, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTaskReq } from "@api/tasks";
import {
  Item,
  priorityColors,
  Select,
  StatusButton,
  StatusButtonSize,
  statusColors,
  TextInput,
} from "@features/ui";
import { Button, ButtonColor, ButtonSize } from "@features/ui";
import classNames from "classnames";
import styles from "./task-new-form.module.scss";
import { queryKeys } from "@api/query-keys";
import { ProjectWithTasks } from "@typings/project.types";
import { UserForOrg } from "@typings/user.types";
import { Priority, Status, TimeUnits } from "@prisma/client";
import { parseDate, parseNumber, titleCase } from "@/app/lib/helpers";
import { createEnumChangeHandler } from "@features/ui";

type TaskNewFormProps = {
  project: ProjectWithTasks;
  users?: UserForOrg[];
  className?: string;
};

export function TaskNewForm({ project, users, className }: TaskNewFormProps) {
  const [name, setName] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [status, setStatus] = useState<Status>(Status.READY);
  const [priority, setPriority] = useState<Priority>(Priority.LOW);
  const [timeEstimate, setTimeEstimate] = useState("");
  const [timeEstimateUnits, setTimeEstimateUnits] = useState<TimeUnits>(
    TimeUnits.HOURS,
  );
  const [dueDate, setDueDate] = useState("");

  const handleStatusChange = (newEnumValue: string) => {
    const newStatus = newEnumValue as Status;
    setStatus(newStatus);
  };

  const handlePriorityChange = (newEnumValue: string) => {
    const newPriority = newEnumValue as Priority;
    setPriority(newPriority);
  };

  // key is the id set in the map function for <Item>
  const handleAssigneeChange = (key: Key) => {
    const idx = Number(key);

    if (typeof idx === "number" && users && users.length > 0) {
      const user = users[idx];
      setAssigneeId(user.id);
    }
  };

  // Ensure Key types from Select input is of correct Prisma enum types
  const handleTimeEstimateUnitsChange = createEnumChangeHandler(
    setTimeEstimateUnits,
    TimeUnits,
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (event: React.SyntheticEvent) => {
      event.preventDefault();

      const task = {
        projectId: project.id,
        name,
        assigneeId,
        status,
        priority,
        timeEstimate: parseNumber(timeEstimate),
        timeEstimateUnits,
        dueDate: parseDate(dueDate),
      };

      return createTaskReq(task);
    },
    onSuccess: () => {
      // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [queryKeys.projects] });

      // Call prop function (such as a setState function)
    },
  });

  return (
    <div className={classNames(styles.container, className)}>
      <form
        className={styles.form}
        onSubmit={mutation.mutate}
        data-testid="task-new-form"
      >
        <TextInput
          autoFocus
          onChange={setName}
          value={name}
          className={classNames(styles.input, styles.textInput)}
          label="Task Name"
          data-testid="task-new-name-input"
        />

        <Select
          className={styles.input}
          onSelectionChange={handleAssigneeChange}
          label="Asignee"
          data-testid={"task-new-assignee-input"}
        >
          {users?.map((user, idx) => (
            <Item key={`assignee-${idx}`} id={idx}>
              {titleCase(user.name)}
            </Item>
          ))}
        </Select>

        <StatusButton
          className={styles.input}
          size={StatusButtonSize.Large}
          items={statusColors}
          isActive={true}
          onStatusChange={handleStatusChange}
        />

        <StatusButton
          className={styles.input}
          size={StatusButtonSize.Large}
          items={priorityColors}
          isActive={true}
          onStatusChange={handlePriorityChange}
        />

        <TextInput
          className={classNames(styles.input, styles.textInput)}
          type="number"
          inputMode="numeric"
          onChange={setTimeEstimate}
          value={timeEstimate}
          label="Time Estimate"
          data-testid="task-new-time-estimate-input"
        />

        <Select
          className={styles.input}
          onSelectionChange={handleTimeEstimateUnitsChange}
          label="Time Units"
          data-testid={"task-new-time-estimate-units-input"}
        >
          {Object.keys(TimeUnits).map((timeUnit, idx) => (
            <Item key={`time-unit-${idx}`} id={timeUnit}>
              {titleCase(timeUnit)}
            </Item>
          ))}
        </Select>

        <TextInput
          className={classNames(styles.input, styles.textInput)}
          type="date"
          onChange={setDueDate}
          value={dueDate}
          label="Due Date"
          data-testid="task-due-date-input"
        />

        <Button
          size={ButtonSize.Medium}
          color={ButtonColor.Primary}
          data-testid="task-create-button"
          type="submit"
          isDisabled={name.length === 0 || mutation.isPending}
        >
          Create
        </Button>
      </form>
    </div>
  );
}
