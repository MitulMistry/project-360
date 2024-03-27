import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authOptions } from "@/app/lib/authOptions";
import { redirect } from "next/navigation";
import { Routes } from "@config/routes";
import { Head } from "../head";
import classNames from "classnames";
import styles from "./auth-page-container.module.scss";

type AuthPageContainerProps = {
  children: React.ReactNode;
  title: string;
  className?: string;
};

export async function AuthPageContainer({
  children,
  title,
  className,
}: AuthPageContainerProps) {
  // If user is already logged in, redirect to dashboard
  const session = await getServerSession(authOptions);
  if (session) redirect(Routes.organizations);

  return (
    <div className={styles.container}>
      <Head title={title} />

      <main className={classNames(styles.main, className)}>{children}</main>
    </div>
  );
}
