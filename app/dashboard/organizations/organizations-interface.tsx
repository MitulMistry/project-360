"use client";

import { useState } from "react";
import { Button, ButtonColor, ButtonSize } from "@features/ui";
import { PlusIcon } from "@features/ui";
import styles from "./organizations-interface.module.scss";
import {
  OrganizationJoinForm,
  OrganizationNewForm,
} from "@/features/organizations";

export default function OrganizationsInterface() {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);

  const enableJoinForm = () => {
    setShowJoinForm(true);
    setShowNewForm(false);
  };

  const enableNewForm = () => {
    setShowJoinForm(false);
    setShowNewForm(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1>Organizations</h1>
        <div className={styles.buttons}>
          <Button
            size={ButtonSize.Medium}
            color={ButtonColor.White}
            className={styles.button}
            onPress={enableJoinForm}
            isDisabled={showJoinForm}
          >
            Join Organization
          </Button>
          <Button
            size={ButtonSize.Medium}
            color={ButtonColor.Primary}
            className={styles.button}
            onPress={enableNewForm}
            isDisabled={showNewForm}
          >
            <PlusIcon />
            New Organization
          </Button>
        </div>
      </div>
      {showJoinForm && <OrganizationJoinForm className={styles.form} />}
      {showNewForm && <OrganizationNewForm className={styles.form} />}
    </div>
  );
}
