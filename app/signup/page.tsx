import type { Metadata } from "next";
import { appMetadata } from "@/app/lib/app-metadata";
import { AuthPageContainer } from "@features/layout";
import { SignUpForm } from "@features/auth";
import Link from "next/link";
import { Routes } from "@config/routes";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: `${appMetadata.title} - Sign Up`,
  description: appMetadata.description,
};

export default function SignUp() {
  return (
    <AuthPageContainer>
      <div className={styles.textContainer} data-testid="signup">
        <h1 className={styles.header}>Create an Account</h1>
        <p className={styles.text} data-testid="description">
          Have an account?{" "}
          <Link href={Routes.login} data-testid="login">
            Sign in
          </Link>
        </p>
      </div>
      <div className={styles.formContainer}>
        <SignUpForm className={styles.form} />
      </div>
    </AuthPageContainer>
  );
}
