import Link from "next/link";
import Image from "next/image";
import React from "react";
import classNames from "classnames";
import styles from "./menu-item-link.module.scss";

type MenuItemProps = {
  text: string;
  iconSrc?: string;
  image?: React.ReactNode;
  href: string;
  isActive?: boolean;
};

export function MenuItemLink({
  text,
  href,
  iconSrc,
  image,
  isActive = false,
}: MenuItemProps) {
  return (
    <li className={classNames(styles.listItem, isActive && styles.active)}>
      <Link className={styles.anchor} href={href}>
        {iconSrc && (
          <Image
            src={iconSrc}
            width={24}
            height={24}
            alt={`${text} icon`}
            className={styles.icon}
          />
        )}
        {!iconSrc && image && (
          <span className={classNames(styles.span, styles.icon)}>{image}</span>
        )}
        {text}
      </Link>
    </li>
  );
}
