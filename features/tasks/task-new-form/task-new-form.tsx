"use client";

import React from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createTaskReq } from "@api/tasks";
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
// import { queryKeys } from "@api/query-keys";
// import { ProjectWithTasks } from "@/typings/project.types";

type TaskNewFormProps = {
  // project: ProjectWithTasks;
  className?: string;
};

export function TaskNewForm({ className }: TaskNewFormProps) {
  // const [name, setName] = useState("");
  // const [assigneeId, setAssigneeId] = useState("");
  // const [status, setStatus] = useState();
  // const [priority, setPriority] = useState();
  // const [timeEstimate, setTimeEstimate] = useState();
  // const [timeEstimateUnits, setTimeEstimateUnits] = useState();
  // const [dueDate, setDueDate] = useState();

  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: (event: React.SyntheticEvent) => {
  //     event.preventDefault();

  //     const task = {
  //       projectId: project.id,
  //       name,
  //       assigneeId,
  //       status,
  //       priority,
  //       timeEstimate,
  //       timeEstimateUnits,
  //       dueDate,
  //     };

  //     return createTaskReq(task);
  //   },
  //   onSuccess: () => {
  //     // Invalidate the query to trigger a refetch
  //     queryClient.invalidateQueries({ queryKey: [queryKeys.projects] });

  //     setName("");
  //   },
  // });

  return (
    <div className={classNames(styles.container, className)}>
      <form
        className={styles.form}
        // onSubmit={mutation.mutate}
        data-testid="task-new-form"
      >
        <TextInput
          autoFocus
          // onChange={setName}
          // value={name}
          className={classNames(styles.input, styles.textInput)}
          label="Task Name"
          data-testid="task-new-name-input"
        />
        <Select
          className={styles.input}
          label="Asignee"
          data-testid={"task-new-assignee-input"}
        >
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
        <StatusButton
          className={styles.input}
          size={StatusButtonSize.Large}
          items={statusColors}
          isActive={true}
        />

        <StatusButton
          className={styles.input}
          size={StatusButtonSize.Large}
          items={priorityColors}
          isActive={true}
        />
        <TextInput
          className={classNames(styles.input, styles.textInput)}
          // onChange={setTimeEstimate}
          // value={timeEstimate}
          label="Time Estimate"
          data-testid="task-new-time-estimate-input"
        />
        <Select
          className={styles.input}
          label="Time Units"
          data-testid={"task-new-time-estimate-units-input"}
        >
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
        <Button
          size={ButtonSize.Medium}
          color={ButtonColor.Primary}
          data-testid="task-create-button"
          type="submit"
          // isDisabled={name.length === 0 || mutation.isPending}
        >
          Create
        </Button>
      </form>
    </div>
  );
}
