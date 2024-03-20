"use client";

import React from "react";
import { Button, TextInput } from "@/features/ui";
import { OAuthGitHubButton } from "@/features/auth";
import styles from "./signup-form.module.scss";

type SignUpProps = {
  className?: string;
};

export function SignUpForm({ className }: SignUpProps) {
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
          isDisabled={true}
        />
        <TextInput
          label="Password"
          placeholder="Create Password"
          type="password"
          inputMode="text"
          className={styles.textInput}
          isDisabled={true}
        />
        <Button className={styles.submit} isDisabled={true}>
          Create Account
        </Button>

        <hr className={styles.ruler} />
        <p className={styles.text}>Or create an account using:</p>
        <OAuthGitHubButton className={styles.button} />
      </div>
    </form>
  );
}
