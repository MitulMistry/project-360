import React from "react";
import { UserForOrg } from "@/typings/user.types";
// import { OrganizationCard } from "@features/organizations";
import { capitalize } from "lodash";
import { UserAvatar, UserAvatarSize } from "@features/team";
import classNames from "classnames";
import styles from "./team-table.module.scss";

type TeamTableProps = {
  className?: string;
  users?: UserForOrg[];
};

export function TeamTable({ className, users }: TeamTableProps) {
  return (
    <div className={classNames(styles.container, className)}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {users &&
            users.map((user, idx) => (
              <tr key={`team-user-${idx}`} className={styles.tableRow}>
                <th scope="row">
                  <UserAvatar
                    size={UserAvatarSize.Small}
                    className={styles.avatar}
                  />
                  {user.name}
                </th>
                <td>{capitalize(user.role)}</td>
                <td>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
