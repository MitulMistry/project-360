import { AuthPageContainer } from "@features/layout";
import { SignUpForm } from "@/features/auth";
import Link from "next/link";
import styles from "./page.module.scss";

export default function SignUp() {
  return (
    <AuthPageContainer title="Sign Up">
      <div className={styles.textContainer} data-testid="signup">
        <h1 className={styles.header}>Create an Account</h1>
        <p className={styles.text} data-testid="description">
          Have an account?{" "}
          <Link href="/login" data-testid="login">
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
