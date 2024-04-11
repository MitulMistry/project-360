"use client";

import { useContext, useState } from "react";
import { CurrentDataContext } from "@/app/context/current-data-provider";
import { Button, ButtonVariant, ButtonColor } from "@features/ui";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Routes } from "@config/routes";
import { MenuItemLink } from "./menu-item-link";
import { HouseIcon, ListIcon, UsersIcon, PowerIcon } from "@features/ui";
import { signOut } from "next-auth/react";
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
  currentOrgName?: string;
};

export function SidebarNavigation({
  className,
  currentOrgName,
}: SidebarNavigationProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Grab the current organization from context provider, or let it be overridden by prop.
  const { currentOrganization } = useContext(CurrentDataContext);

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.fixedContainer}>
        <header
          className={classNames(
            styles.header,
            isMobileMenuOpen && styles.isMobileMenuOpen,
          )}
        >
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
          {(currentOrganization?.name || currentOrgName) && (
            <div className={styles.currentOrganization}>
              <p data-testid="current-org-name">
                {currentOrganization?.name || currentOrgName}
              </p>
            </div>
          )}

          <ul className={styles.linkList}>
            {menuItems.map((menuItem, index) => (
              <MenuItemLink
                key={index}
                {...menuItem}
                isActive={pathname === menuItem.href}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </ul>
          <ul className={classNames(styles.list, styles.bottom)}>
            <MenuItemLink
              text="Log Out"
              // iconSrc="/icons/power.svg"
              image={<PowerIcon />}
              // href="/api/auth/signout"
              href="/#"
              onClick={() => signOut()}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
