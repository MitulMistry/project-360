import { Head } from "../head";
import styles from "./page-container.module.scss";

type PageContainerProps = {
  children: React.ReactNode;
  title: string;
};

export function PageContainer({ children, title }: PageContainerProps) {
  return (
    <div className={styles.container}>
      <Head title={title} />

      <main className={styles.main}>
        <div className={styles.contentContainer}>{children}</div>
      </main>
    </div>
  );
}
