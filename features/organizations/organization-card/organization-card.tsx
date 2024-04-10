"use client";

import React, { useContext } from "react";
import { CurrentDataContext } from "@/app/context/current-data-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveOrganizationReq } from "@api/organizations";
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
//
export function OrganizationCard({
  className,
  organization,
  owner,
  isSelected = false,
  userIsOwner = false,
}: OrganizationCardProps) {
  // Grab the current organization from context provider
  const { currentOrganization, setCurrentOrganization } =
    useContext(CurrentDataContext);

  const queryClient = useQueryClient();

  const leaveOrgMutation = useMutation({
    mutationFn: () => {
      return leaveOrganizationReq(organization);
    },
    onSuccess: () => {
      // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.dataRow}>
        <div className={styles.leftDataCol}>
          <h3 className={styles.header} data-testid="org-card-name">
            {organization.name}
          </h3>
          <p className={styles.label} data-testid="org-card-id">
            Join Code: <span className={styles.text}>{organization.id}</span>
          </p>
          {owner && (
            <p className={styles.label} data-testid="org-card-owner">
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
        <Selector
          size={SelectorSize.Small}
          isSelected={isSelected || organization.id === currentOrganization?.id}
          onPress={() => setCurrentOrganization(organization)}
          data-testid="org-card-selector"
        >
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
              onPress={() => leaveOrgMutation.mutate()}
              isDisabled={leaveOrgMutation.isPending}
            >
              Leave
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
