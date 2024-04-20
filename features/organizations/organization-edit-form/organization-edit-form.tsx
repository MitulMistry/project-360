"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrganizationReq } from "@api/organizations";
import { queryKeys } from "@api/query-keys";
import { TextInput } from "@features/ui";
import { Button, ButtonColor, ButtonSize } from "@features/ui";
import classNames from "classnames";
import styles from "./organization-edit-form.module.scss";
import type { OrganizationWithOwner } from "@/typings/organization.types";
import { sanitizeOrganization } from "@/app/lib/helpers";

type OrganizationEditFormProps = {
  organization: OrganizationWithOwner;
  onSuccessFn?: () => void; // Used to set state on parent component
  className?: string;
};

export function OrganizationEditForm({
  organization,
  onSuccessFn,
  className,
}: OrganizationEditFormProps) {
  const [name, setName] = useState(organization.name || "");

  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: (event: React.SyntheticEvent) => {
      event.preventDefault();

      const updatedOrganization = sanitizeOrganization({
        ...organization,
        name,
      });
      return updateOrganizationReq(updatedOrganization);
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
      data-testid="org-edit-form"
    >
      <TextInput
        autoFocus
        onChange={setName}
        value={name}
        className={styles.textInput}
        label="Organization name:"
        data-testid="org-name-input"
      />
      <Button
        size={ButtonSize.Medium}
        color={ButtonColor.Primary}
        data-testid="org-update-button"
        type="submit"
        isDisabled={name.length === 0 || editMutation.isPending}
      >
        Update
      </Button>
    </form>
  );
}
