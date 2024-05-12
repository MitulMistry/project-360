import React from "react";
import classNames from "classnames";
import styles from "./loading-indicator.module.scss";

export enum LoadingIndicatorSize {
  Small = "sm",
  Medium = "md",
  Large = "lg",
  ExtraLarge = "xl",
}

export type LoadingIndicatorProps = {
  className?: string;
  size?: LoadingIndicatorSize;
};

export function LoadingIndicator({
  className,
  size = LoadingIndicatorSize.Medium,
}: LoadingIndicatorProps) {
  const src = `/icons/loading-circle-${size}.svg`;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={classNames(styles.loadingIndicator, className)}
        src={src}
        alt="loading circle"
      />
    </>
  );
}
