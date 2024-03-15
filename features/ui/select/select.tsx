"use client";

import React from "react";
import type {
  ListBoxItemProps,
  SelectProps as AriaSelectProps,
  ValidationResult,
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
        <span aria-hidden="true">▼</span>
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
        `${styles.listBoxitem} ${isFocused ? "focused" : ""} ${isSelected ? "selected" : ""}`
      }
    />
  );
}
