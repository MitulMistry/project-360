"use client";

import React from "react";
import { Button, TextInput } from "@/features/ui";
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
        />
        <TextInput
          label="Password"
          placeholder="Enter Password"
          type="password"
          inputMode="text"
          className={styles.textInput}
        />
        <Button className={styles.submit}>Sign In</Button>
      </div>
    </form>
  );
}
