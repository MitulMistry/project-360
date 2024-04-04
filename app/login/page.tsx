import type { Metadata } from "next";
import { appMetadata } from "@/app/lib/app-metadata";
import { AuthPageContainer } from "@features/layout";
import { LoginForm } from "@features/auth";
import Link from "next/link";
import { Routes } from "@config/routes";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: `${appMetadata.title} - Sign In`,
  description: appMetadata.description,
};

export default function SignIn() {
  return (
    <AuthPageContainer>
      <div className={styles.textContainer} data-testid="login">
        <h1 className={styles.header}>Sign In</h1>
        <p className={styles.text} data-testid="description">
          New to our product?{" "}
          <Link href={Routes.signup} data-testid="signup">
            Create an account
          </Link>
        </p>
      </div>
      <div className={styles.formContainer}>
        <LoginForm className={styles.form} />
      </div>
    </AuthPageContainer>
  );
}
