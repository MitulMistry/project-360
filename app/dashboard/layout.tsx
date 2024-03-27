import { SidebarNavigation } from "@features/layout";
import styles from "./layout.module.scss";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.container}>
      <SidebarNavigation className={styles.navigation} />
      <main className={styles.main}>
        <div className={styles.contentContainer}>{children}</div>
      </main>
    </div>
  );
}
