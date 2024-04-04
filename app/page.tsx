import type { Metadata } from "next";
import { appMetadata } from "@/app/lib/app-metadata";
import { AuthPageContainer } from "@features/layout";
import Image from "next/image";
import Link from "next/link";
import { Routes } from "@config/routes";
import { Button } from "@features/ui";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: `${appMetadata.title} - Home`,
  description: appMetadata.description,
};

export default function Home() {
  return (
    <AuthPageContainer>
      <div className={styles.splash} data-testid="splash">
        <Image
          src="/graphics/logo.svg"
          width={208}
          height={39}
          alt="Graphic logo"
          className={styles.logo}
        />
        <Image
          src="/graphics/receipt.svg"
          width={84}
          height={109}
          alt="Graphic receipt"
          className={styles.graphic}
        />
        <h3 className={styles.header}>Project Management Made Simple</h3>
        <p className={styles.text} data-testid="description">
          Create projects, assign tasks, and manage the workflow for your
          organization.
        </p>

        <Link
          href={Routes.signup}
          className={styles.btnLink}
          data-testid="signup"
          passHref
        >
          <Button>Create Account</Button>
        </Link>
        <Link href={Routes.login} data-testid="login" passHref>
          Sign In
        </Link>
      </div>
    </AuthPageContainer>
  );
}
