"use client";
import { useState } from "react";
import { Button, ButtonVariant, ButtonColor } from "@features/ui";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Routes } from "@config/routes";
import { MenuItemLink } from "./menu-item-link";
import { HouseIcon, ListIcon, UsersIcon, PowerIcon } from "@features/ui";
import classNames from "classnames";
import styles from "./sidebar-navigation.module.scss";

// Use direct inline SVG images in order to use currentColor property
// to match color of icon through CSS rules.
const menuItems = [
  {
    text: "Organizations",
    // iconSrc: "/icons/house.svg",
    image: <HouseIcon />,
    href: Routes.organizations,
  },
  {
    text: "Projects",
    // iconSrc: "/icons/list.svg",
    image: <ListIcon />,
    href: Routes.projects,
  },
  {
    text: "Team",
    // iconSrc: "/icons/users.svg",
    image: <UsersIcon />,
    href: Routes.team,
  },
];

type SidebarNavigationProps = {
  className?: string;
  currentOrganization?: string;
};

export function SidebarNavigation({
  className,
  currentOrganization,
}: SidebarNavigationProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={classNames(styles.container, className)}>
      <div
        className={classNames(
          styles.fixedContainer,
          !isMobileMenuOpen && styles.isMobileMenuClosed,
        )}
      >
        <header className={styles.header}>
          <Image
            src="/graphics/logo.svg"
            width={177}
            height={40}
            alt="Graphic logo"
            className={styles.logo}
          />
          <Button
            onPress={() => setMobileMenuOpen(!isMobileMenuOpen)}
            color={ButtonColor.White}
            variant={ButtonVariant.IconOnly}
            className={styles.menuButton}
          >
            <Image
              src={isMobileMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
              width={24}
              height={24}
              alt={isMobileMenuOpen ? "close menu" : "open menu"}
              className={styles.menuIcon}
            />
          </Button>
        </header>

        <div
          className={classNames(
            styles.menuOverlay,
            isMobileMenuOpen && styles.isMobileMenuOpen,
          )}
        />
        <div
          className={classNames(
            styles.nav,
            isMobileMenuOpen && styles.isMobileMenuOpen,
          )}
        >
          {currentOrganization && (
            <div className={styles.currentOrganization}>
              <p>{currentOrganization}</p>
            </div>
          )}

          <ul className={styles.linkList}>
            {menuItems.map((menuItem, index) => (
              <MenuItemLink
                key={index}
                {...menuItem}
                isActive={pathname === menuItem.href}
              />
            ))}
          </ul>
          <ul className={classNames(styles.list, styles.bottom)}>
            <MenuItemLink
              text="Log Out"
              // iconSrc="/icons/power.svg"
              image={<PowerIcon />}
              href="/api/auth/signout"
              isActive={false}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
