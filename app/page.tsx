import { AuthPageContainer } from "@/features/ui";
import Link from "next/link";
import { Button } from "@/features/ui";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <AuthPageContainer title="Home Page">
      <h3>Project Management Made Simple</h3>
      <p>
        Create projects, assign tasks, and manage the workflow for your
        organization.
      </p>

      <Link href="/signup" passHref>
        <Button>Create Account</Button>
      </Link>
      <Link href="/login" passHref>
        Sign In
      </Link>
    </AuthPageContainer>
  );
}
