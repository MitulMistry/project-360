import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authOptions } from "@/app/lib/auth-options";
import { redirect } from "next/navigation";
import { Routes } from "@config/routes";
import classNames from "classnames";
import styles from "./auth-page-container.module.scss";

type AuthPageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export async function AuthPageContainer({
  children,
  className,
}: AuthPageContainerProps) {
  // If user is already logged in, redirect to dashboard
  const session = await getServerSession(authOptions);
  if (session) redirect(Routes.organizations);

  return (
    <div className={styles.container}>
      <main className={classNames(styles.main, className)}>{children}</main>
    </div>
  );
}
