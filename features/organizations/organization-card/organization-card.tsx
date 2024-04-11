"use client";

import React, { useContext, useState } from "react";
import { CurrentDataContext } from "@/app/context/current-data-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  leaveOrganizationReq,
  deleteOrganizationReq,
} from "@api/organizations";
import Image from "next/image";
import {
  Selector,
  SelectorSize,
  Button,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from "@features/ui";
import type { User } from "@prisma/client";
import type { OrganizationWithOwner } from "@/typings/organization.types";
import { EditIcon, TrashIcon } from "@features/ui";
import classNames from "classnames";
import styles from "./organization-card.module.scss";
import { sanitizeOrganization } from "@/app/lib/helpers";
import { OrganizationEditForm } from "../organization-edit-form";

type OrganizationCardProps = {
  className?: string;
  organization: OrganizationWithOwner;
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
  const [enableEditForm, setEnableEditForm] = useState(false);

  // Grab the current organization from context provider
  const { currentOrganization, setCurrentOrganization } =
    useContext(CurrentDataContext);

  const queryClient = useQueryClient();

  const leaveOrgMutation = useMutation({
    mutationFn: () => {
      // Get rid of extra keys, like isOwner
      const sanitizedOrg = sanitizeOrganization(organization);
      return leaveOrganizationReq(sanitizedOrg);
    },
    onSuccess: () => {
      // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });

  const deleteOrgMutation = useMutation({
    mutationFn: () => {
      // Get rid of extra keys, like isOwner
      const sanitizedOrg = sanitizeOrganization(organization);
      return deleteOrganizationReq(sanitizedOrg);
    },
    onSuccess: () => {
      // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });

  return (
    <div className={classNames(styles.container, className)}>
      <div
        className={classNames(
          styles.dataRow,
          enableEditForm && styles.enabledEditForm,
        )}
      >
        <div className={styles.leftDataCol}>
          <h3 className={styles.header} data-testid="org-card-name">
            {organization.name}
          </h3>
          {!enableEditForm && (
            <>
              <p className={styles.label} data-testid="org-card-id">
                Join Code:{" "}
                <span className={styles.text}>{organization.id}</span>
              </p>
              {owner && (
                <p className={styles.label} data-testid="org-card-owner">
                  Owner: <span className={styles.text}>{owner.name}</span>
                </p>
              )}
            </>
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
      {enableEditForm && (
        <OrganizationEditForm
          organization={organization}
          onSuccessFn={() => setEnableEditForm(false)}
          className={styles.editForm}
        />
      )}
      <div className={styles.buttonRow}>
        <Selector
          size={SelectorSize.Medium}
          isSelected={isSelected || organization.id === currentOrganization?.id}
          onPress={() => setCurrentOrganization(organization)}
          data-testid="org-card-selector"
        >
          {isSelected ? "Selected" : "Select"}
        </Selector>
        <div className={styles.buttons}>
          {userIsOwner || organization.isOwner ? (
            <>
              <Button
                size={ButtonSize.Medium}
                color={ButtonColor.White}
                variant={ButtonVariant.IconOnly}
                className={styles.button}
                onPress={() => setEnableEditForm(!enableEditForm)}
                data-testid="org-edit-button"
              >
                <EditIcon />
              </Button>
              <Button
                size={ButtonSize.Medium}
                color={ButtonColor.DestructiveSecondary}
                variant={ButtonVariant.IconOnly}
                className={styles.button}
                onPress={() => deleteOrgMutation.mutate()}
                isDisabled={deleteOrgMutation.isPending}
                data-testid="org-delete-button"
              >
                <TrashIcon />
              </Button>
            </>
          ) : (
            <Button
              size={ButtonSize.Medium}
              color={ButtonColor.DestructiveSecondary}
              className={styles.button}
              onPress={() => leaveOrgMutation.mutate()}
              isDisabled={leaveOrgMutation.isPending}
              data-testid="org-leave-button"
            >
              Leave
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
