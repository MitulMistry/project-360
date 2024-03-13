import { AuthPageContainer } from "@/features/ui";
import Link from "next/link";
import styles from "./page.module.scss";

export default function SignUp() {
  return (
    <AuthPageContainer title="Sign Up">
      <div className={styles.signUp} data-testid="login">
        <h1 className={styles.header}>Create an Account</h1>
        <p className={styles.text} data-testid="description">
          Have an account?{" "}
          <Link href="/login" data-testid="login">
            Sign in
          </Link>
        </p>
      </div>
    </AuthPageContainer>
  );
}
