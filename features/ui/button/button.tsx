"use client";

import React from "react";
import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import { Button as AriaButton } from "react-aria-components";
import classNames from "classnames";
import styles from "./button.module.scss";

export enum ButtonSize {
  Small = "sm",
  Medium = "md",
  Large = "lg",
}

export enum ButtonColor {
  Primary = "primary",
  Secondary = "secondary",
  Destructive = "destructive",
  DestructiveSecondary = "destructive-secondary",
  White = "white",
}

export enum ButtonVariant {
  Default = "default",
  IconOnly = "iconOnly",
}

// React-Aria Button component is not native HTML Button element,
// so doesn't make sense to extend it.
// https://react-spectrum.adobe.com/react-aria/Button.html#props
type ButtonProps = AriaButtonProps & {
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
};

export function Button({
  className,
  size = ButtonSize.Medium,
  color = ButtonColor.Primary,
  variant = ButtonVariant.Default,
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      className={classNames(
        styles.button,
        styles[size],
        styles[color],
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
