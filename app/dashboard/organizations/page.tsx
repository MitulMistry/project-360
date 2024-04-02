"use client";

import { PageContainer } from "@features/layout";
import { Button, ButtonColor, ButtonSize } from "@features/ui";
import { PlusIcon } from "@features/ui";
// import type { Organization } from "@prisma/client";
import { UserOrganizations } from "./user-organizations";
// import { OrganizationList } from "@features/organizations";
import styles from "./page.module.scss";
// import { fetchUserOrganizations } from "@/app/lib/actions/organizations";

export default function Organizations() {
  // const organizations: Organization[] | undefined =
  //   await fetchUserOrganizations("mitulmistrydev@gmail.com");

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
              <PlusIcon />
              New Organization
            </Button>
          </div>
        </div>

        <UserOrganizations />
        {/* <OrganizationList organizations={organizations} /> */}
      </div>
    </PageContainer>
  );
}
