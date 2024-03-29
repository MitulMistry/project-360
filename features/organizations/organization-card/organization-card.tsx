import React from "react";
import Image from "next/image";
import {
  Selector,
  // SelectorSize,
  Button,
  // ButtonColor,
  // ButtonSize,
  // ButtonVariant,
} from "@/features/ui";
import type { User, Organization } from "@prisma/client";
import classNames from "classnames";
import styles from "./organization-card.module.scss";

type OrganizationCardProps = {
  className?: string;
  organization: Organization;
  owner: User;
  isSelected?: boolean;
  userIsOwner?: boolean;
};

export function OrganizationCard({
  className,
  organization,
  owner,
  isSelected = false,
  userIsOwner = false,
}: OrganizationCardProps) {
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.dataRow}>
        <div className={styles.leftDataCol}>
          <h3>{organization.name}</h3>
          <p className={styles.label}>Join Code: {organization.id}</p>
          <p className={styles.label}>Owner: {owner.name}</p>
        </div>
        <div className={styles.rightDataCol}>
          <Image
            src="/graphics/usersGraphic.svg"
            width={56}
            height={56}
            alt="Organization graphic"
            className={styles.usersGraphic}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <Selector>{isSelected ? "Selected" : "Select"}</Selector>
        <div className={styles.buttons}>
          {userIsOwner ? (
            <>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </>
          ) : (
            <Button>Leave</Button>
          )}
        </div>
      </div>
    </div>
  );
}
