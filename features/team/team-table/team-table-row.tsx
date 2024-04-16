import React from "react";
import { UserForOrg } from "@/typings/user.types";
import { capitalize } from "lodash";
import { UserAvatar, UserAvatarSize } from "@features/team";
import { Button, ButtonSize, ButtonColor, ButtonVariant } from "@/features/ui";
import { EditIcon } from "@/features/ui";
import classNames from "classnames";
import styles from "./team-table-row.module.scss";
import { Role } from "@prisma/client";

type TeamTableRowProps = {
  className?: string;
  user: UserForOrg;
  isOwner?: boolean;
};

export function TeamTableRow({
  className,
  user,
  isOwner = false,
}: TeamTableRowProps) {
  return (
    <tr className={classNames(styles.tableRow, className)}>
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
  );
}
