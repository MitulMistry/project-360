import React from "react";
import { UserForOrg } from "@/typings/user.types";
// import { OrganizationCard } from "@features/organizations";
import { capitalize } from "lodash";
import { UserAvatar, UserAvatarSize } from "@features/team";
import { Button, ButtonSize, ButtonColor, ButtonVariant } from "@/features/ui";
import { EditIcon } from "@/features/ui";
import classNames from "classnames";
import styles from "./team-table.module.scss";
import { Role } from "@prisma/client";

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
              <tr key={`team-user-${idx}`} className={styles.tableRow}>
                <th scope="row" className={styles.th}>
                  <div className={styles.cell}>
                    <UserAvatar
                      size={UserAvatarSize.Small}
                      className={styles.avatar}
                      imgUrl={user.image || undefined}
                    />
                    {user.name}
                  </div>
                </th>
                <td className={styles.td}>{capitalize(user.role)}</td>
                <td className={styles.td}>{user.email}</td>
                {isOwner && (
                  <td className={styles.td}>
                    {user.role !== Role.OWNER && (
                      <Button
                        variant={ButtonVariant.IconOnly}
                        size={ButtonSize.Small}
                        color={ButtonColor.White}
                        className={styles.button}
                      >
                        <EditIcon />
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
