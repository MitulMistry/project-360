import React from "react";
import type { TextFieldProps, ValidationResult } from "react-aria-components";
import {
  TextField,
  Label,
  Input,
  FieldError,
  Text,
} from "react-aria-components";
import classNames from "classnames";
import styles from "./text-input.module.scss";

// Using React Aria Text Field
// https://react-spectrum.adobe.com/react-aria/TextField.html
type TextInputProps = TextFieldProps & {
  label?: string;
  className?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  icon?: React.ReactNode;
  placeholder?: string;
};

export function TextInput({
  label,
  className,
  description,
  errorMessage,
  placeholder,
  ...props
}: TextInputProps) {
  return (
    <TextField
      className={classNames(styles["text-field"], className)}
      {...props}
    >
      {label && <Label>{label}</Label>}
      <Input className={styles.input} placeholder={placeholder} />
      {description && <Text slot="description">{description}</Text>}
      {errorMessage && (
        <FieldError className={styles["field-error"]}>
          {errorMessage}
        </FieldError>
      )}
    </TextField>
  );
}
