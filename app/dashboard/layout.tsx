import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import { redirect } from "next/navigation";
import { Routes } from "@config/routes";
import { SidebarNavigation } from "@features/layout";
import { checkIfVercelPreview, checkIfCypress } from "@/app/lib/check-env";
import styles from "./layout.module.scss";
import { CurrentDataProvider } from "../context/current-data-provider";

// Asynchronous server component to access session
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // If user is not authenticated, should not have access to any dashboard
  // pages, so redirect to login
  const session = await getServerSession(authOptions);

  // Skip authentication for deployment preview on Vercel and for Cypress tests.
  // To skip for Cypress tests, must run dev server with environment variable,
  // CYPRESS_ENV=true
  // if (!session) redirect(Routes.login);
  if (!session && !checkIfVercelPreview() && !checkIfCypress())
    redirect(Routes.login);

  return (
    <div className={styles.container}>
      {/* Use CurrentDataProvider to give access to current organization to children */}
      <CurrentDataProvider>
        <SidebarNavigation className={styles.navigation} />
        <main className={styles.main}>
          <div className={styles.contentContainer}>{children}</div>
        </main>
      </CurrentDataProvider>
    </div>
  );
}
