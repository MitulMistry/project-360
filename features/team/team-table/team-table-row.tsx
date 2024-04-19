import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrganizationUserReq } from "@/api/organizations";
import { UserForOrg } from "@/typings/user.types";
import { titleCase } from "@/app/lib/helpers";
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
import { OrganizationUser, Role } from "@prisma/client";
import type { Key } from "react-aria-components";

type TeamTableRowProps = {
  className?: string;
  user: UserForOrg;
  isOwner?: boolean;
  currentOrgId: string;
  idx: number;
};

export function TeamTableRow({
  className,
  user,
  isOwner = false,
  currentOrgId,
  idx,
}: TeamTableRowProps) {
  const [editFormEnabled, setEditFormEnabled] = useState(false);
  const [userRole, setUserRole] = useState(user.role);

  // Ensure Key type from Select input is of correct Role type
  const handleRoleChange = (key: Key) => {
    if (typeof key === "string" && Object.keys(Role).includes(key)) {
      setUserRole(key as Role);
    }
  };

  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: () => {
      const organizationUser: Omit<OrganizationUser, "joinedAt"> = {
        userId: user.id,
        organizationId: currentOrgId,
        role: userRole,
      };

      return updateOrganizationUserReq(organizationUser);
    },
    onSuccess: () => {
      // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["team"] });
      // Invoke prop function (typically a set state function from parent component)
      // if (onSuccessFn) onSuccessFn();
      setEditFormEnabled(false);
    },
  });

  return (
    <tr
      className={classNames(styles.tableRow, className)}
      data-testid={`row-${idx}`}
    >
      <th scope="row" className={styles.th}>
        <div className={styles.cell} data-testid={`user-name-${idx}`}>
          <UserAvatar
            size={UserAvatarSize.Small}
            className={styles.avatar}
            imgUrl={user.image || undefined}
          />
          {titleCase(user.name)}
        </div>
      </th>
      <td className={styles.td} data-testid={`user-role-${idx}`}>
        {editFormEnabled ? (
          <Select
            className={styles.select}
            selectedKey={userRole}
            onSelectionChange={handleRoleChange}
            data-testid={`user-role-select-${idx}`}
          >
            {Object.keys(Role)
              .filter((role) => role !== "OWNER") // Skip Owner (can't promote to owner)
              .map((role, idx) => (
                <Item key={idx} id={role}>
                  {titleCase(role)}
                </Item>
              ))}
          </Select>
        ) : (
          titleCase(user.role)
        )}
      </td>
      <td className={styles.td} data-testid={`user-email-${idx}`}>
        {user.email}
      </td>
      <td className={styles.td}>
        {editFormEnabled && (
          <div className={styles.containerRight}>
            <Button
              size={ButtonSize.Small}
              color={ButtonColor.Primary}
              // className={styles.submitButton}
              onPress={() => editMutation.mutate()}
              isDisabled={editMutation.isPending}
              data-testid={`user-submit-button-${idx}`}
            >
              Submit
            </Button>
          </div>
        )}
      </td>
      {isOwner && (
        <td className={styles.td}>
          {user.role !== Role.OWNER && (
            <Button
              variant={ButtonVariant.IconOnly}
              size={ButtonSize.Small}
              color={ButtonColor.White}
              // className={styles.button}
              onPress={() => setEditFormEnabled(!editFormEnabled)}
              data-testid={`user-edit-button-${idx}`}
            >
              <EditIcon />
            </Button>
          )}
        </td>
      )}
    </tr>
  );
}
