"use client";

import { Description, Field, Input, Label } from "@headlessui/react";
import React from "react";

import styles from "./input-box.module.scss";

interface Props {
  label: string;
  description?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const InputBox: React.FC<Props> = ({
  label,
  description,
  placeholder,
  onChange,
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    if (value.length > 2) {
      onChange(value);
    }
  };

  return (
    <Field className={styles.inputField}>
      <Label className={styles.label}>{label}</Label>
      {description && (
        <Description className={styles.description}>{description}</Description>
      )}
      <Input
        onChange={handleChange}
        className={styles.input}
        placeholder={placeholder}
      />
    </Field>
  );
};

export default InputBox;
