"use client";

import React from "react";
import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import { Button as AriaButton } from "react-aria-components";
import classNames from "classnames";
import styles from "./selector.module.scss";

export enum SelectorSize {
  Small = "sm",
  Medium = "md",
  Large = "lg",
}

// React-Aria Button component is not native HTML Button element,
// so doesn't make sense to extend it.
// https://react-spectrum.adobe.com/react-aria/Button.html#props
type SelectorProps = AriaButtonProps & {
  className?: string;
  size?: SelectorSize;
  isSelected?: boolean;
};

export function Selector({
  className,
  size = SelectorSize.Medium,
  isSelected = false,
  ...props
}: SelectorProps) {
  return (
    <AriaButton
      className={classNames(
        styles.selector,
        styles[size],
        isSelected && styles.selected,
        className,
      )}
      {...props}
    />
  );
}
