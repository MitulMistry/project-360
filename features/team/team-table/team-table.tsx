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
          <tr className={styles.tr}>
            <th scope="col" className={styles.th}>
              Name
            </th>
            <th scope="col" className={styles.th}>
              Role
            </th>
            <th scope="col" className={styles.th}>
              Email
            </th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {users &&
            users.map((user, idx) => (
              <tr key={`team-user-${idx}`} className={styles.tableRow}>
                <th scope="row" className={styles.th}>
                  <UserAvatar
                    size={UserAvatarSize.Small}
                    className={styles.avatar}
                    imgUrl={user.image || undefined}
                  />
                  {user.name}
                </th>
                <td className={styles.td}>{capitalize(user.role)}</td>
                <td className={styles.td}>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
