import React from "react";
import Image from "next/image";
import classNames from "classnames";
import styles from "./user-avatar.module.scss";

export enum UserAvatarSize {
  XSmall = 24,
  Small = 36,
  Medium = 48,
  Large = 72,
  XLarge = 96,
}

type UserAvatarProps = {
  className?: string;
  imgUrl?: string;
  size?: UserAvatarSize;
};

export function UserAvatar({
  className,
  imgUrl,
  size = UserAvatarSize.Small,
}: UserAvatarProps) {
  return (
    <Image
      // For external image hosts (such as GitHub), add them to next.config.mjs
      src={imgUrl || "/icons/avatar-gray.svg"}
      className={classNames(styles.image, className)}
      width={size}
      height={size}
      alt="User avatar"
    />
  );
}
