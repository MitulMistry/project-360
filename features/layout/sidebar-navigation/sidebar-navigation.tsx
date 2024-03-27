"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Routes } from "@config/routes";
import { MenuItemLink } from "./menu-item-link";
import classNames from "classnames";
import styles from "./sidebar-navigation.module.scss";

// Use direct inline SVG images in order to use currentColor property
// to match color of icon through CSS rules.
const houseIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.3287 3.51558C13.3873 3.56764 13.4428 3.6231 13.4948 3.68167L19.4948 10.4317C19.8202 10.7978 20 11.2706 20 11.7604V19C20 20.1046 19.1046 21 18 21H14.002C14.0013 21 14.0007 21 14 21H10C9.99934 21 9.99868 21 9.99803 21H6C4.89543 21 4 20.1046 4 19V11.7604C4 11.2706 4.17976 10.7978 4.50518 10.4317L10.5052 3.68167C11.239 2.8561 12.5032 2.78174 13.3287 3.51558ZM11 19H13V15H11V19ZM15 19V14C15 13.4477 14.5523 13 14 13H10C9.44772 13 9 13.4477 9 14V19H6V11.7604L12 5.0104L18 11.7604V19H15Z"
      fill="currentColor"
    />
  </svg>
);

const listIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6 15V17H4V15H6ZM19 15C19.5523 15 20 15.4477 20 16C20 16.5523 19.5523 17 19 17H9C8.44772 17 8 16.5523 8 16C8 15.4477 8.44772 15 9 15H19ZM6 11V13H4V11H6ZM19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H9C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11H19ZM6 7V9H4V7H6ZM19 7C19.5523 7 20 7.44772 20 8C20 8.55228 19.5523 9 19 9H9C8.44772 9 8 8.55228 8 8C8 7.44772 8.44772 7 9 7H19Z"
      fill="currentColor"
    />
  </svg>
);

const usersIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 11C19.0871 11 20.9253 12.0656 22.0002 13.6825L21.9993 17H14L13.999 18.952L14.0215 20H2V19C2 15.6863 4.68629 13 8 13C9.37834 13 10.6509 13.4657 11.6662 14.2518C12.662 12.3204 14.6768 11 17 11ZM8 15C6.26204 15 4.78296 16.1084 4.23109 17.6569L4.16936 17.8447L4.126 18H11.873L11.8362 17.8625C11.3827 16.3295 10.0355 15.1846 8.4051 15.0203L8.19987 15.0049L8 15ZM17 13C15.6048 13 14.3764 13.7144 13.6606 14.7973L13.535 15H20.464L20.3707 14.845C19.6927 13.7872 18.5304 13.0708 17.2007 13.005L17 13ZM8 4C10.2091 4 12 5.79086 12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4ZM17 4C18.6569 4 20 5.34315 20 7C20 8.65685 18.6569 10 17 10C15.3431 10 14 8.65685 14 7C14 5.34315 15.3431 4 17 4ZM8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6ZM17 6C16.7239 6 16 6 16 6C16 6 16 6.72386 16 7C16 7.27614 16 8 16 8C16 8 16.7239 8 17 8C17.2761 8 18 8 18 8C18 8 18 7.27614 18 7C18 6.86441 18 6 18 6C18 6 17.1356 6 17 6Z"
      fill="currentColor"
    />
  </svg>
);

const powerIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.75803 6.27872C9.00648 6.65161 8.90497 7.15489 8.5313 7.40283C6.77782 8.56626 5.625 10.5533 5.625 12.8087C5.625 16.3911 8.53515 19.2951 12.125 19.2951C15.7149 19.2951 18.625 16.3911 18.625 12.8087C18.625 10.5533 17.4722 8.56626 15.7187 7.40283C15.345 7.15489 15.2435 6.65161 15.492 6.27872C15.7404 5.90582 16.2447 5.80452 16.6184 6.05246C18.8056 7.50368 20.25 9.98769 20.25 12.8087C20.25 17.2866 16.6123 20.9167 12.125 20.9167C7.63769 20.9167 4 17.2866 4 12.8087C4 9.98769 5.44436 7.50368 7.63158 6.05246C8.00525 5.80452 8.50958 5.90582 8.75803 6.27872Z"
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.125 3C12.5852 3 12.9583 3.3731 12.9583 3.83333V10.5C12.9583 10.9602 12.5852 11.3333 12.125 11.3333C11.6647 11.3333 11.2916 10.9602 11.2916 10.5V3.83333C11.2916 3.3731 11.6647 3 12.125 3Z"
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const menuItems = [
  {
    text: "Organizations",
    // iconSrc: "/icons/house.svg",
    image: houseIcon,
    href: Routes.organizations,
  },
  {
    text: "Projects",
    // iconSrc: "/icons/list.svg",
    image: listIcon,
    href: Routes.projects,
  },
  {
    text: "Team",
    // iconSrc: "/icons/users.svg",
    image: usersIcon,
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
                isActive={pathname === menuItem.href}
              />
            ))}
          </ul>
          <ul className={classNames(styles.list, styles.bottom)}>
            <MenuItemLink
              text="Log Out"
              // iconSrc="/icons/power.svg"
              image={powerIcon}
              href="/api/auth/signout"
              isActive={false}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
