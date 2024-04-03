"use client";

import React from "react";
import { TextInput } from "@features/ui";
import { Button, ButtonColor, ButtonSize } from "@features/ui";
import classNames from "classnames";
import styles from "./organization-new-form.module.scss";

type OrganizationNewFormProps = {
  className?: string;
};

export function OrganizationNewForm({ className }: OrganizationNewFormProps) {
  return (
    <div className={classNames(styles.container, className)}>
      <h3 className={styles.header}>Create Organization</h3>
      <form className={styles.form} data-testid="org-new-form">
        <TextInput
          className={styles.textInput}
          label="Enter organization name:"
          data-testid="org-name-input"
        />
        <Button
          size={ButtonSize.Medium}
          color={ButtonColor.Primary}
          data-testid="org-create-button"
        >
          Create
        </Button>
      </form>
    </div>
  );
}
