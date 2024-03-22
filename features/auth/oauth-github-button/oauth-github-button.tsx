"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button, ButtonColor, ButtonIcon } from "@features/ui/";
import type { ButtonProps } from "@features/ui";
// import styles from "./oauth-github-button.module.scss";

export function OAuthGitHubButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={className}
      color={ButtonColor.White}
      onPress={() => signIn("github")}
      data-testid="gitHubOAuthButton"
      {...props}
    >
      <ButtonIcon src="/icons/github-mark.svg" />
      Continue with GitHub
    </Button>
  );
}
