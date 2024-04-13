import type { Metadata } from "next";
import { appMetadata } from "@/app/lib/app-metadata";
import { PageContainer } from "@features/layout";
import styles from "./page.module.scss";
import { TeamPage } from "./team-page";

export const metadata: Metadata = {
  title: `${appMetadata.title} - Team`,
  description: appMetadata.description,
};

export default function Team() {
  return (
    <PageContainer>
      <div className={styles.container}>
        <TeamPage />
      </div>
    </PageContainer>
  );
}
