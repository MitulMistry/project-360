"use client";

import React, { useState } from "react";
import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import { Button as AriaButton } from "react-aria-components";
import { Status, Priority } from "@prisma/client";
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
  High = "high",
  Critical = "critical",
}

type StatusColorItem = {
  name: string;
  color: StatusColor;
};

export const statusToTextMap = {
  [Status.READY]: "Ready to Start",
  [Status.INPROGRESS]: "In Progress",
  [Status.DONE]: "Done",
  [Status.STUCK]: "Stuck",
  [Priority.LOW]: "Low",
  [Priority.MEDIUM]: "Medium",
  [Priority.HIGH]: "High",
  [Priority.CRITICAL]: "Critical",
};

const statusToColorMap = {
  [Status.READY]: StatusColor.Ready,
  [Status.INPROGRESS]: StatusColor.InProgress,
  [Status.DONE]: StatusColor.Done,
  [Status.STUCK]: StatusColor.Stuck,
  [Priority.LOW]: StatusColor.Low,
  [Priority.MEDIUM]: StatusColor.Medium,
  [Priority.HIGH]: StatusColor.High,
  [Priority.CRITICAL]: StatusColor.Critical,
};

export const statusColors = [
  {
    name: statusToTextMap[Status.READY],
    color: statusToColorMap[Status.READY],
  },
  {
    name: statusToTextMap[Status.INPROGRESS],
    color: statusToColorMap[Status.INPROGRESS],
  },
  { name: statusToTextMap[Status.DONE], color: statusToColorMap[Status.DONE] },
  {
    name: statusToTextMap[Status.STUCK],
    color: statusToColorMap[Status.STUCK],
  },
];

export const priorityColors = [
  {
    name: statusToTextMap[Priority.LOW],
    color: statusToColorMap[Priority.LOW],
  },
  {
    name: statusToTextMap[Priority.MEDIUM],
    color: statusToColorMap[Priority.MEDIUM],
  },
  {
    name: statusToTextMap[Priority.HIGH],
    color: statusToColorMap[Priority.HIGH],
  },
  {
    name: statusToTextMap[Priority.CRITICAL],
    color: statusToColorMap[Priority.CRITICAL],
  },
];

// React-Aria Button component is not native HTML Button element,
// so doesn't make sense to extend it.
// https://react-spectrum.adobe.com/react-aria/Button.html#props
type StatusButtonProps = AriaButtonProps & {
  className?: string;
  size?: StatusButtonSize;
  initialItem?: Status | Priority;
  items: StatusColorItem[];
  isActive?: boolean;
};

export function StatusButton({
  className,
  size = StatusButtonSize.Medium,
  initialItem,
  items,
  isActive = true,
  ...props
}: StatusButtonProps) {
  // Find the index of the item that matches the initial status
  const initializedId = initialItem
    ? items.findIndex((item) => item.color === statusToColorMap[initialItem])
    : 0;

  const [selectedId, setSelectedId] = useState(initializedId);

  const increment = () => {
    const newId = selectedId === items.length - 1 ? 0 : selectedId + 1;
    setSelectedId(newId);
  };

  return (
    <div className={classNames(styles.container, className)}>
      {isActive ? (
        // If the component is active, render a clickable button
        <AriaButton
          className={classNames(
            styles.statusButton,
            styles[size],
            styles[items[selectedId].color],
          )}
          onPress={() => increment()}
          {...props}
        >
          {items[selectedId].name}
        </AriaButton>
      ) : (
        // If the component is not active, render an un-clickable div (with same styles)
        <div
          className={classNames(
            styles.statusButton,
            styles[size],
            styles[items[selectedId].color],
            !isActive && styles.inactive,
          )}
        >
          {items[selectedId].name}
        </div>
      )}
    </div>
  );
}
