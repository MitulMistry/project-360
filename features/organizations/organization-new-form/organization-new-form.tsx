"use client";

import React, { useState } from "react";
import { TextInput } from "@features/ui";
import { Button, ButtonColor, ButtonSize } from "@features/ui";
import classNames from "classnames";
import styles from "./organization-new-form.module.scss";

type OrganizationNewFormProps = {
  className?: string;
};

export function OrganizationNewForm({ className }: OrganizationNewFormProps) {
  const [name, setName] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { name };
      await fetch("/api/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classNames(styles.container, className)}>
      <h3 className={styles.header}>Create Organization</h3>
      <form
        className={styles.form}
        onSubmit={submitData}
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
        >
          Create
        </Button>
      </form>
    </div>
  );
}
