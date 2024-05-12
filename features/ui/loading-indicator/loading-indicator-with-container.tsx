import React from "react";
import classNames from "classnames";
import styles from "./loading-indicator-with-container.module.scss";
import { LoadingIndicator, LoadingIndicatorSize } from "./loading-indicator";

export type LoadingIndicatorProps = {
  className?: string;
  size?: LoadingIndicatorSize;
};

export function LoadingIndicatorWithContainer({
  className,
  size,
}: LoadingIndicatorProps) {
  return (
    <div
      className={classNames(styles.container, className)}
      data-testid="loading-indicator-container"
    >
      <LoadingIndicator size={size} />
    </div>
  );
}
