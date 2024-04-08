"use client";

import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./notification.module.scss";

export enum NotificationColor {
  PrimarySolid = "primarySolid",
  SuccessSolid = "successSolid",
  ErrorSolid = "errorSolid",
  AlertSolid = "alertSolid",
  NeutralSolid = "neutralSolid",
  PrimaryLight = "primaryLight",
  SuccessLight = "successLight",
  ErrorLight = "errorLight",
  AlertLight = "alertLight",
  NeutralLight = "neutralLight",
}

export type NotificationProps = {
  children: ReactNode;
  className?: string;
  color?: NotificationColor;
};

export function Notification({
  children,
  className,
  color = NotificationColor.PrimarySolid,
}: NotificationProps) {
  return (
    <div className={classNames(styles.container, styles[color], className)}>
      {children}
    </div>
  );
}
