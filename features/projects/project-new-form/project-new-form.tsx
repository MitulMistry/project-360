"use client";

import React, { useContext, useState } from "react";
import { CurrentDataContext } from "@/app/context/current-data-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProjectReq } from "@api/projects";
import { TextInput } from "@features/ui";
import { Button, ButtonColor, ButtonSize } from "@features/ui";
import classNames from "classnames";
import styles from "./project-new-form.module.scss";
import { queryKeys } from "@api/query-keys";

type ProjectNewFormProps = {
  className?: string;
};

export function ProjectNewForm({ className }: ProjectNewFormProps) {
  const [name, setName] = useState("");

  const { currentOrganization } = useContext(CurrentDataContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (event: React.SyntheticEvent) => {
      event.preventDefault();

      const project = { organizationId: currentOrganization?.id || "", name };
      return createProjectReq(project);
    },
    onSuccess: () => {
      // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [queryKeys.projects] });

      setName("");
    },
  });

  return (
    <div className={classNames(styles.container, className)}>
      <h3 className={styles.header}>Create Project</h3>
      <form
        className={styles.form}
        onSubmit={mutation.mutate}
        data-testid="project-new-form"
      >
        <TextInput
          autoFocus
          onChange={setName}
          value={name}
          className={styles.textInput}
          label="Enter project name:"
          data-testid="project-name-input"
        />
        <Button
          size={ButtonSize.Medium}
          color={ButtonColor.Primary}
          data-testid="project-create-button"
          type="submit"
          isDisabled={name.length === 0 || mutation.isPending}
        >
          Create
        </Button>
      </form>
    </div>
  );
}
