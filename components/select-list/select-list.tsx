"use client";

import React from "react";
import { Description, Field, Label, Select } from "@headlessui/react";
import styles from "./select-list.module.scss";

type Option = {
  value?: number | string;
  name: string;
};

interface Props {
  label: string;
  defaultValue?: string;
  description?: string;
  options: Option[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const SelectList: React.FC<Props> = ({
  options,
  defaultValue,
  label,
  description,
  onChange,
}) => {
  return (
    <Field className={styles.container}>
      <Label className={styles.label}>{label}</Label>
      {description && (
        <Description className={styles.description}>{description}</Description>
      )}
      <div>
        <Select
          className={styles.select}
          onChange={onChange}
          defaultValue={defaultValue}
        >
          {options.map(({ name, value }) => (
            <option key={name} value={value}>
              {name}
            </option>
          ))}
        </Select>
      </div>
    </Field>
  );
};

export default SelectList;
