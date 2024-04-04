import type { Metadata } from "next";
import { appMetadata } from "@/app/lib/app-metadata";
import { PageContainer } from "@features/layout";
// import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: `${appMetadata.title} - Projects`,
  description: appMetadata.description,
};

export default function Projects() {
  return (
    <PageContainer>
      <h1>Projects</h1>
    </PageContainer>
  );
}
