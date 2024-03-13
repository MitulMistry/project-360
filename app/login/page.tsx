import { AuthPageContainer } from "@/features/ui";
import Link from "next/link";
import styles from "./page.module.scss";

export default function SignIn() {
  return (
    <AuthPageContainer title="Sign In">
      <div className={styles.signIn} data-testid="login">
        <h1 className={styles.header}>Sign In</h1>
        <p className={styles.text} data-testid="description">
          New to our product?{" "}
          <Link href="/signup" data-testid="signup">
            Create an account
          </Link>
        </p>
      </div>
    </AuthPageContainer>
  );
}
