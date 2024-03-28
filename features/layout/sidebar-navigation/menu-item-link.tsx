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
  onClick?: () => void;
};

export function MenuItemLink({
  text,
  href,
  iconSrc,
  image,
  isActive = false,
  onClick,
}: MenuItemProps) {
  return (
    <li className={classNames(styles.listItem, isActive && styles.active)}>
      <Link
        className={classNames(styles.anchor, isActive && styles.isDisabled)}
        href={href}
        aria-disabled={isActive}
        tabIndex={isActive ? -1 : undefined} // Disable keyboard tabbing
        onClick={onClick}
      >
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
