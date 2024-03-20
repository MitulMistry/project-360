"use client";

import React from "react";
import Link from "next/link";
import { Button, ButtonColor, ButtonIcon } from "@features/ui/";
import type { ButtonProps } from "@features/ui";
import styles from "./oauth-github-button.module.scss";

export function OAuthGitHubButton({ className, ...props }: ButtonProps) {
  return (
    <Link href="/api/signin" className={styles.link}>
      <Button className={className} color={ButtonColor.White} {...props}>
        <ButtonIcon src="/icons/github-mark.svg" />
        Continue with GitHub
      </Button>
    </Link>
  );
}
