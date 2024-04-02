import React from "react";
import type { Organization } from "@prisma/client";
import { OrganizationCard } from "@features/organizations";
import classNames from "classnames";
import styles from "./organization-list.module.scss";

type OrganizationListProps = {
  className?: string;
  organizations?: Organization[];
};

export function OrganizationList({
  className,
  organizations,
}: OrganizationListProps) {
  return (
    <div className={classNames(styles.container, className)}>
      {organizations &&
        organizations.map((organization, idx) => (
          <OrganizationCard
            key={`org-${idx}`}
            className={styles.card}
            organization={organization}
          />
        ))}
    </div>
  );
}
