"use client";

import React from "react";
import { TextInput } from "@features/ui";
import { Button, ButtonColor, ButtonSize } from "@features/ui";
import classNames from "classnames";
import styles from "./organization-join-form.module.scss";

type OrganizationJoinFormProps = {
  className?: string;
};

export function OrganizationJoinForm({ className }: OrganizationJoinFormProps) {
  return (
    <div className={classNames(styles.container, className)}>
      <h3 className={styles.header}>Join Organization</h3>
      <form className={styles.form} data-testid="org-join-form">
        <TextInput
          className={styles.textInput}
          label="Enter join code:"
          data-testid="org-id-input"
        />
        <Button
          size={ButtonSize.Medium}
          color={ButtonColor.Primary}
          data-testid="org-join-button"
        >
          Join
        </Button>
      </form>
    </div>
  );
}
