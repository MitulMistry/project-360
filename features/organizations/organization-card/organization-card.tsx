"use client";

import React from "react";
import Image from "next/image";
import {
  Selector,
  SelectorSize,
  Button,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from "@features/ui";
import type { User, Organization } from "@prisma/client";
import { EditIcon, TrashIcon } from "@features/ui";
import classNames from "classnames";
import styles from "./organization-card.module.scss";

type OrganizationCardProps = {
  className?: string;
  organization: Organization;
  owner?: User;
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
          <h3 className={styles.header}>{organization.name}</h3>
          <p className={styles.label}>
            Join Code: <span className={styles.text}>{organization.id}</span>
          </p>
          {owner && (
            <p className={styles.label}>
              Owner: <span className={styles.text}>{owner.name}</span>
            </p>
          )}
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
        <Selector size={SelectorSize.Small} isSelected={isSelected}>
          {isSelected ? "Selected" : "Select"}
        </Selector>
        <div className={styles.buttons}>
          {userIsOwner ? (
            <>
              <Button
                size={ButtonSize.Small}
                color={ButtonColor.White}
                variant={ButtonVariant.IconOnly}
                className={styles.button}
              >
                <EditIcon />
              </Button>
              <Button
                size={ButtonSize.Small}
                color={ButtonColor.DestructiveSecondary}
                variant={ButtonVariant.IconOnly}
                className={styles.button}
              >
                <TrashIcon />
              </Button>
            </>
          ) : (
            <Button
              size={ButtonSize.Small}
              color={ButtonColor.DestructiveSecondary}
              className={styles.button}
            >
              Leave
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
