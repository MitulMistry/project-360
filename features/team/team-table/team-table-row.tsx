import React, { useState } from "react";
import { UserForOrg } from "@/typings/user.types";
import { capitalize } from "lodash";
import { UserAvatar, UserAvatarSize } from "@features/team";
import {
  Button,
  ButtonSize,
  ButtonColor,
  ButtonVariant,
  Select,
  Item,
} from "@features/ui";
import { EditIcon } from "@features/ui";
import classNames from "classnames";
import styles from "./team-table-row.module.scss";
import { Role } from "@prisma/client";
import type { Key } from "react-aria-components";

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
  const [editFormEnabled, setEditFormEnabled] = useState(false);
  const [userRole, setUserRole] = useState(user.role);

  // Ensure Key type from Select input is of correct Role type
  const handleRoleChange = (key: Key) => {
    if (typeof key === "string" && Object.keys(Role).includes(key)) {
      setUserRole(key as Role);
    }
  };

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
      <td className={styles.td}>
        {editFormEnabled ? (
          <Select selectedKey={userRole} onSelectionChange={handleRoleChange}>
            {Object.keys(Role)
              .filter((role) => role !== "OWNER") // Skip Owner (can't promote to owner)
              .map((role, idx) => (
                <Item key={idx} id={role}>
                  {capitalize(role)}
                </Item>
              ))}
          </Select>
        ) : (
          capitalize(user.role)
        )}
      </td>
      <td className={styles.td}>{user.email}</td>
      {isOwner && (
        <td className={styles.td}>
          {user.role !== Role.OWNER && (
            <Button
              variant={ButtonVariant.IconOnly}
              size={ButtonSize.Small}
              color={ButtonColor.White}
              className={styles.button}
              onPress={() => setEditFormEnabled(!editFormEnabled)}
            >
              <EditIcon />
            </Button>
          )}
        </td>
      )}
    </tr>
  );
}
