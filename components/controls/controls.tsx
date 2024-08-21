"use client";

import React, { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import InputBox from "@/components/input-box/input-box";
import SelectList from "@/components/select-list/select-list";
import styles from "./controls.module.scss";

const Controls: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * update the query string whilst persisting any existing query params
   */
  const updateQueryParams = useCallback(
    (name: string, value: string): string => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return `?${params.toString()}`;
    },
    [searchParams]
  );

  /**
   * Debounce name search to provide a smoother ux and ensure we don't spam the server
   */
  const updateSearch = useDebouncedCallback((params: string) => {
    router.push(params);
  }, 500);

  /**
   * Trigger search when search string is more than 2 characters.
   * Also allow an empty string to clear search
   */
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value;
    if (!searchString || searchString.length > 1) {
      const params = updateQueryParams("search", searchString);
      updateSearch(params);
    }
  };

  const onOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const order = event.target.value;
    const params = updateQueryParams("order", order);
    router.push(params);
  };

  return (
    <div className={styles.container}>
      <InputBox
        label="Search a patient"
        name="search"
        onChange={onSearchChange}
        defaultValue={searchParams.get("search") ?? ""}
      />
      <SelectList
        defaultValue={searchParams.get("order") ?? ""}
        options={[
          { name: "default", value: "" },
          { name: "Last name ascending", value: "ascending" },
          { name: "Last name descending", value: "descending" },
        ]}
        onChange={onOrderChange}
        label="Sort by"
      />
    </div>
  );
};

export default Controls;
