import type { Metadata } from "next";
import { appMetadata } from "@/app/lib/app-metadata";
import { PageContainer } from "@features/layout";
// import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: `${appMetadata.title} - Team`,
  description: appMetadata.description,
};

export default function Team() {
  return (
    <PageContainer>
      <h1>Team</h1>
    </PageContainer>
  );
}
