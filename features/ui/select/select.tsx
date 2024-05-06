"use client";

import React from "react";
import type {
  ListBoxItemProps,
  SelectProps as AriaSelectProps,
  ValidationResult,
  Key,
} from "react-aria-components";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as AriaSelect,
  SelectValue,
  FieldError,
  Text,
} from "react-aria-components";
import classNames from "classnames";
import styles from "./select.module.scss";

// Using React Aria Select
// https://react-spectrum.adobe.com/react-aria/Select.html
interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children"> {
  className?: string;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

// This is a higher order function that ensures Key type from Select input is
// of the correct (Prisma) enum type. It is used to create handler functions like this:
// const handleRoleChange = createEnumChangeHandler(setUserRole, Role);
// const handleStatusChange = createEnumChangeHandler(setUserStatus, Status);

// It's a generic function to replace specific cases such as:
// const handleRoleChange = (key: Key) => {
//   if (typeof key === "string" && Object.keys(Role).includes(key)) {
//     setUserRole(key as Role);
//   }
// };

// export const createEnumChangeHandler =
//   (
//     setEnumValue: (value: string) => void, // A React setState function
//     enumObject: Record<string, unknown>, // A Prisma enum like Role, Priority, etc.
//   ) =>
//   (key: Key) => {
//     // The key is from React Aria select component
//     if (typeof key === "string" && Object.keys(enumObject).includes(key)) {
//       setEnumValue(key);
//     }
//   };

export const createEnumChangeHandler =
  <T extends string | number>(
    setEnumValue: React.Dispatch<React.SetStateAction<T>>,
    enumObject: Record<string, T>,
  ) =>
  (key: Key) => {
    if (
      typeof key === "string" &&
      Object.values(enumObject).includes(key as T)
    ) {
      setEnumValue(key as T);
    }
  };

export function Select<T extends object>({
  className,
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect {...props} className={classNames(styles.select, className)}>
      <Label className={styles.label}>{label}</Label>
      <Button
        className={classNames(styles.button, errorMessage && styles.error)}
      >
        <SelectValue />
        <span className={styles.arrowIcon} aria-hidden="true">
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Use stroke of currentColor to set color via CSS */}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.292893 0.292893C-0.0675907 0.653377 -0.0953203 1.22061 0.209705 1.6129L0.292893 1.70711L5.29289 6.70711C5.65338 7.06759 6.22061 7.09532 6.6129 6.7903L6.70711 6.70711L11.7071 1.70711C12.0976 1.31658 12.0976 0.683418 11.7071 0.292893C11.3466 -0.0675907 10.7794 -0.0953203 10.3871 0.209705L10.2929 0.292893L6 4.585L1.70711 0.292893C1.34662 -0.0675907 0.779392 -0.0953203 0.387101 0.209705L0.292893 0.292893Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </Button>
      {description && (
        <Text className={styles.description} slot="description">
          {description}
        </Text>
      )}
      <FieldError className={styles.fieldError}>{errorMessage}</FieldError>
      <Popover className={styles.popover}>
        <ListBox className={styles.listBox} items={items}>
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}

export function Item(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        `${styles.listBoxItem} ${isFocused ? "focused" : ""} ${isSelected ? "selected" : ""}`
      }
    />
  );
}
