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
  const rows = [];

  // Reorder organizations array into a 2D array with two elements
  // per row in order to properly form a grid.
  if (organizations) {
    for (let i = 0; i < organizations?.length; i += 2) {
      const row = [];
      row[0] = organizations[i];
      if (i + 1 < organizations.length) row[1] = organizations[i + 1];
      rows.push(row);
    }
  }

  return (
    <div className={classNames(styles.container, className)}>
      {organizations &&
        rows.length > 0 &&
        rows.map((row, rowIdx) => (
          <div key={`org-row-${rowIdx}`} className={styles.row}>
            {row.map((organization, colIdx) => (
              <OrganizationCard
                key={`org-${rowIdx}-${colIdx}`}
                className={styles.card}
                organization={organization}
              />
            ))}
            {/* Add an empty element if we have an odd number so row expands properly */}
            {row.length === 1 && <div className={styles.emptyCard}></div>}
          </div>
        ))}
    </div>
  );
}
