import React from "react";
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

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
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
    <button
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
