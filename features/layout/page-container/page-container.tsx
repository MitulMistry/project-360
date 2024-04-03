// import { Metadata, ResolvingMetadata } from "next";
import styles from "./page-container.module.scss";

type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.contentContainer}>{children}</div>
      </main>
    </div>
  );
}
