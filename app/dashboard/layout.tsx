import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { redirect } from "next/navigation";
import { Routes } from "@config/routes";
import { SidebarNavigation } from "@features/layout";
import styles from "./layout.module.scss";

// Asynchronous server component to access session
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // If user is not authenticated, should not have access to any dashboard
  // pages, so redirect to login
  const session = await getServerSession(authOptions);
  if (!session) redirect(Routes.login);

  return (
    <div className={styles.container}>
      <SidebarNavigation className={styles.navigation} />
      <main className={styles.main}>
        <div className={styles.contentContainer}>{children}</div>
      </main>
    </div>
  );
}
