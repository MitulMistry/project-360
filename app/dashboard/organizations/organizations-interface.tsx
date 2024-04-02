"use client";

import { Button, ButtonColor, ButtonSize } from "@features/ui";
import { PlusIcon } from "@features/ui";
import styles from "./organizations-interface.module.scss";

export default function OrganizationsInterface() {
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1>Organizations</h1>
        <div className={styles.buttons}>
          <Button
            size={ButtonSize.Medium}
            color={ButtonColor.White}
            className={styles.button}
          >
            Join Organization
          </Button>
          <Button
            size={ButtonSize.Medium}
            color={ButtonColor.Primary}
            className={styles.button}
          >
            <PlusIcon />
            New Organization
          </Button>
        </div>
      </div>
    </div>
  );
}
