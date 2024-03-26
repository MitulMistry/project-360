"use client";

import Image from "next/image";
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
  currentOrganization?: string;
};

export function SidebarNavigation({
  className,
  currentOrganization,
}: SidebarNavigationProps) {
  const router = useRouter();

  return (
    <div className={classNames(styles.container, className)}>
      <div className={classNames(styles.fixedContainer)}>
        <header className={styles.header}>
          <Image
            src="/graphics/logo.svg"
            width={177}
            height={40}
            alt="Graphic logo"
            className={styles.logoLarge}
          />
        </header>

        {currentOrganization && (
          <div className={styles.currentOrganization}>
            <p>{currentOrganization}</p>
          </div>
        )}

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
          <ul className={classNames(styles.list, styles.bottom)}>
            <MenuItemLink
              text="Log Out"
              iconSrc="/icons/power.svg"
              href="/api/auth/signout"
              isActive={false}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
