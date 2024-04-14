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
  isDisabled?: boolean;
  onClick?: () => void;
};

export function MenuItemLink({
  text,
  href,
  iconSrc,
  image,
  isActive = false,
  isDisabled = false,
  onClick,
}: MenuItemProps) {
  const img = (
    <>
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
    </>
  );

  if (isActive)
    return (
      <div className={styles.active}>
        {img}
        {text}
      </div>
    );

  if (isDisabled)
    return (
      <div className={styles.disabled}>
        {img}
        {text}
      </div>
    );

  return (
    <li className={styles.listItem}>
      <Link
        className={styles.anchor}
        href={href}
        aria-disabled={isActive || isDisabled}
        tabIndex={isActive || isDisabled ? -1 : undefined} // Disable keyboard tabbing
        onClick={onClick}
        role="link"
      >
        {img}
        {text}
      </Link>
    </li>
  );
}
