import type { Metadata } from "next";
import { appMetadata } from "@/app/lib/app-metadata";
import { PageContainer } from "@features/layout";
import styles from "./page.module.scss";
import OrganizationsPage from "./organizations-page";

export const metadata: Metadata = {
  title: `${appMetadata.title} - Organizations`,
  description: appMetadata.description,
};

export default function Organizations() {
  return (
    <PageContainer>
      <div className={styles.container}>
        <OrganizationsPage />
      </div>
    </PageContainer>
  );
}
