import React from "react";
import { UserForOrg } from "@/typings/user.types";
// import { OrganizationCard } from "@features/organizations";
import classNames from "classnames";
import styles from "./team-table.module.scss";

type TeamTableProps = {
  className?: string;
  users?: UserForOrg[];
};

export function TeamTable({ className, users }: TeamTableProps) {
  return (
    <div className={classNames(styles.container, className)}>
      <table>
        <thead>
          <th scope="col">Name</th>
          <th scope="col">Role</th>
          <th scope="col">Email</th>
        </thead>
        <tbody>
          {users &&
            users.map((user, idx) => (
              <tr key={`team-user-${idx}`} className={styles.row}>
                <th scope="row">{user.name}</th>
                <td>{user.role}</td>
                <td>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
