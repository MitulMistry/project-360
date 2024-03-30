"use client";

import { PageContainer } from "@features/layout";
import { Button, ButtonColor, ButtonSize } from "@features/ui";
import { OrganizationList } from "@features/organizations";
import styles from "./page.module.scss";

export default function Organizations() {
  return (
    <PageContainer title="Organizations">
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
              New Organization
            </Button>
          </div>
        </div>

        <OrganizationList />
      </div>
    </PageContainer>
  );
}
