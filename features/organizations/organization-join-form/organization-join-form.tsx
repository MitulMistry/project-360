"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinOrganizationReq } from "@api/organizations";
import { TextInput } from "@features/ui";
import { Button, ButtonColor, ButtonSize } from "@features/ui";
import classNames from "classnames";
import styles from "./organization-join-form.module.scss";

type OrganizationJoinFormProps = {
  className?: string;
};

export function OrganizationJoinForm({ className }: OrganizationJoinFormProps) {
  const [id, setId] = useState("");

  const queryClient = useQueryClient();

  const joinOrgMutation = useMutation({
    mutationFn: (event: React.SyntheticEvent) => {
      event.preventDefault();

      const organization = { id };
      return joinOrganizationReq(organization);
    },
    onSuccess: () => {
      // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      setId("");
    },
  });

  return (
    <div className={classNames(styles.container, className)}>
      <h3 className={styles.header}>Join Organization</h3>
      <form
        className={styles.form}
        onSubmit={joinOrgMutation.mutate}
        data-testid="org-join-form"
      >
        <TextInput
          autoFocus
          onChange={setId}
          value={id}
          className={styles.textInput}
          label="Enter join code:"
          data-testid="org-id-input"
        />
        <Button
          size={ButtonSize.Medium}
          color={ButtonColor.Primary}
          data-testid="org-join-button"
          type="submit"
          isDisabled={id.length === 0 || joinOrgMutation.isPending}
        >
          Join
        </Button>
      </form>
    </div>
  );
}
