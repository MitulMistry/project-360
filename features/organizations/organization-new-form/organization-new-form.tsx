"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrganizationReq } from "@api/organizations";
import { TextInput } from "@features/ui";
import { Button, ButtonColor, ButtonSize } from "@features/ui";
import classNames from "classnames";
import styles from "./organization-new-form.module.scss";
import { queryKeys } from "@api/query-keys";

type OrganizationNewFormProps = {
  className?: string;
};

export function OrganizationNewForm({ className }: OrganizationNewFormProps) {
  const [name, setName] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (event: React.SyntheticEvent) => {
      event.preventDefault();

      const organization = { name };
      return createOrganizationReq(organization);
    },
    onSuccess: () => {
      // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [queryKeys.organizations] });

      setName("");
    },
  });

  return (
    <div className={classNames(styles.container, className)}>
      <h3 className={styles.header}>Create Organization</h3>
      <form
        className={styles.form}
        onSubmit={mutation.mutate}
        data-testid="org-new-form"
      >
        <TextInput
          autoFocus
          onChange={setName}
          value={name}
          className={styles.textInput}
          label="Enter organization name:"
          data-testid="org-name-input"
        />
        <Button
          size={ButtonSize.Medium}
          color={ButtonColor.Primary}
          data-testid="org-create-button"
          type="submit"
          isDisabled={name.length === 0 || mutation.isPending}
        >
          Create
        </Button>
      </form>
    </div>
  );
}
