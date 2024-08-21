"use client";

import React from "react";
import { Description, Field, Input, Label } from "@headlessui/react";
import styles from "./input-box.module.scss";

interface Props {
  label: string;
  name: string;
  description?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string | number;
}

const InputBox: React.FC<Props> = ({
  label,
  name,
  description,
  placeholder,
  onChange,
  defaultValue,
}) => {
  return (
    <Field className={styles.inputField}>
      <Label className={styles.label}>{label}</Label>
      {description && (
        <Description className={styles.description}>{description}</Description>
      )}
      <Input
        name={name}
        placeholder={placeholder}
        className={styles.input}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </Field>
  );
};

export default InputBox;
