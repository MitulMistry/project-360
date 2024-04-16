import React from "react";
import { UserForOrg } from "@/typings/user.types";
import { TeamTableRow } from "@features/team";
import classNames from "classnames";
import styles from "./team-table.module.scss";

type TeamTableProps = {
  className?: string;
  users?: UserForOrg[];
  isOwner?: boolean;
};

export function TeamTable({
  className,
  users,
  isOwner = false,
}: TeamTableProps) {
  return (
    <div className={classNames(styles.container, className)}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={styles.tr}>
            <th
              scope="col"
              className={classNames(styles.th, styles.ownerEnabled)}
            >
              Name
            </th>
            <th
              scope="col"
              className={classNames(styles.th, styles.ownerEnabled)}
            >
              Role
            </th>
            <th
              scope="col"
              className={classNames(styles.th, styles.ownerEnabled)}
            >
              Email
            </th>
            {isOwner && (
              <th
                scope="col"
                className={classNames(styles.th, styles.ownerEnabled)}
              >
                Edit
              </th>
            )}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {users &&
            users.map((user, idx) => (
              <TeamTableRow
                key={`team-user-${idx}`}
                user={user}
                isOwner={isOwner}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}
