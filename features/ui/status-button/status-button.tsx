"use client";

import React, { useState } from "react";
import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import { Button as AriaButton } from "react-aria-components";
import classNames from "classnames";
import styles from "./status-button.module.scss";

export enum StatusButtonSize {
  Small = "sm",
  Medium = "md",
  Large = "lg",
}

export enum StatusColor {
  Ready = "ready",
  InProgress = "inProgress",
  Done = "done",
  Stuck = "stuck",
  Low = "low",
  Medium = "medium",
  Critical = "critical",
  High = "high",
}

type StatusColorItem = {
  name: string;
  color: StatusColor;
};

export const statusColors = [
  { name: "Ready to Start", color: StatusColor.Ready },
  { name: "In Progress", color: StatusColor.InProgress },
  { name: "Done", color: StatusColor.Done },
  { name: "Stuck", color: StatusColor.Stuck },
];

export const priorityColors = [
  { name: "Low", color: StatusColor.Low },
  { name: "Medium", color: StatusColor.Medium },
  { name: "Critical", color: StatusColor.Critical },
  { name: "High", color: StatusColor.High },
];

// React-Aria Button component is not native HTML Button element,
// so doesn't make sense to extend it.
// https://react-spectrum.adobe.com/react-aria/Button.html#props
type StatusButtonProps = AriaButtonProps & {
  className?: string;
  size?: StatusButtonSize;
  initializedId?: number;
  items: StatusColorItem[];
};

export function StatusButton({
  className,
  size = StatusButtonSize.Medium,
  initializedId = 0,
  items,
  ...props
}: StatusButtonProps) {
  const [selectedId, setSelectedId] = useState(initializedId);

  const increment = () => {
    const newId = selectedId === items.length - 1 ? 0 : selectedId + 1;
    setSelectedId(newId);
  };

  return (
    <AriaButton
      className={classNames(
        styles.statusButton,
        styles[size],
        styles[items[selectedId].color],
        className,
      )}
      onPress={() => increment()}
      {...props}
    >
      {items[selectedId].name}
    </AriaButton>
  );
}
