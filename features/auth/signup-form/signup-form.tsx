"use client";

import React from "react";
import { Button, TextInput } from "@/features/ui";
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
        />
        <TextInput
          label="Password"
          placeholder="Create Password"
          type="password"
          inputMode="text"
          className={styles.textInput}
        />
        <Button className={styles.submit}>Create Account</Button>
      </div>
    </form>
  );
}
