"use client";

import React from "react";
import { Button, TextInput } from "@/features/ui";
import { OAuthGitHubButton } from "@/features/auth";
import styles from "./login-form.module.scss";

type LoginProps = {
  className?: string;
};

export function LoginForm({ className }: LoginProps) {
  return (
    <form className={className}>
      <div className={styles.container}>
        <TextInput
          label="Email"
          placeholder="Enter Email Address"
          type="email"
          inputMode="email"
          className={styles.textInput}
          autoFocus={true}
          data-testid="emailInput"
          isDisabled={true}
        />
        <TextInput
          label="Password"
          placeholder="Enter Password"
          type="password"
          inputMode="text"
          className={styles.textInput}
          data-testid="passwordInput"
          isDisabled={true}
        />
        <Button
          className={styles.button}
          data-testid="submitButton"
          isDisabled={true}
        >
          Sign In
        </Button>

        <hr className={styles.ruler} />
        <p className={styles.text}>Or sign in using:</p>
        <OAuthGitHubButton />
      </div>
    </form>
  );
}
