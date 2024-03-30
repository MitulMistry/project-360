import React from "react";
import classNames from "classnames";
import styles from "./organization-list.module.scss";

type OrganizationListProps = {
  className?: string;
};

export function OrganizationList({ className }: OrganizationListProps) {
  return <div className={classNames(styles.container, className)}></div>;
}
