"use client";

import { useRouter } from "next/router";
import { Routes } from "@config/routes";
import { MenuItemLink } from "./menu-item-link";
import classNames from "classnames";
import styles from "./sidebar-navigation.module.scss";

const menuItems = [
  {
    text: "Organizations",
    iconSrc: "/icons/house.svg",
    href: Routes.organizations,
  },
  { text: "Projects", iconSrc: "/icons/list.svg", href: Routes.projects },
  { text: "Team", iconSrc: "/icons/users.svg", href: Routes.team },
];

type SidebarNavigationProps = {
  className?: string;
};

export function SidebarNavigation({ className }: SidebarNavigationProps) {
  const router = useRouter();

  return (
    <div className={classNames(styles.container, className)}>
      <header className={styles.header}>Project 360</header>

      <div className={styles.menu}>
        <ul className={styles.linkList}>
          {menuItems.map((menuItem, index) => (
            <MenuItemLink
              key={index}
              {...menuItem}
              isActive={router.pathname === menuItem.href}
            />
          ))}
        </ul>
        <ul className={styles.list}></ul>
      </div>
    </div>
  );
}
