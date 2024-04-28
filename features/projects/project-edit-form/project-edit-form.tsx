"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectReq } from "@/api/projects";
import { queryKeys } from "@api/query-keys";
import { TextInput } from "@features/ui";
import { Button, ButtonColor, ButtonSize } from "@features/ui";
import classNames from "classnames";
import styles from "./project-edit-form.module.scss";
import { ProjectWithTasks } from "@/typings/project.types";
import { sanitizeProject } from "@/app/lib/helpers";

type ProjectEditFormProps = {
  project: ProjectWithTasks;
  onSuccessFn?: () => void; // Used to set state on parent component
  className?: string;
};

export function ProjectEditForm({
  project,
  onSuccessFn,
  className,
}: ProjectEditFormProps) {
  const [name, setName] = useState(project.name || "");

  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: (event: React.SyntheticEvent) => {
      event.preventDefault();

      const updatedProject = sanitizeProject({
        ...project,
        name,
      });
      return updateProjectReq(updatedProject);
    },
    onSuccess: () => {
      // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [queryKeys.organizations] });
      // Invoke prop function (typically a set state function from parent component)
      if (onSuccessFn) onSuccessFn();
    },
  });

  return (
    <form
      className={classNames(styles.form, className)}
      onSubmit={editMutation.mutate}
      data-testid="project-edit-form"
    >
      <TextInput
        autoFocus
        onChange={setName}
        value={name}
        className={styles.textInput}
        label="Project name:"
        data-testid="project-name-input"
      />
      <Button
        size={ButtonSize.Medium}
        color={ButtonColor.Primary}
        data-testid="project-update-button"
        type="submit"
        isDisabled={name.length === 0 || editMutation.isPending}
      >
        Update
      </Button>
    </form>
  );
}
