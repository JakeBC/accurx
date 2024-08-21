import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import Controls from "./controls";

jest.mock("use-debounce", () => ({
  useDebouncedCallback: (fn: () => null) => fn,
}));
jest.mock("next/router", () => jest.requireActual("next-router-mock"));

describe("Controls", () => {
  test("displays a search text input", () => {
    render(<Controls />);
    expect(
      screen.getByRole("textbox", { name: "Search a patient" })
    ).toBeInTheDocument();
  });

  test("displays a sort by select list", () => {
    render(<Controls />);
    const selectList = screen.getByRole("combobox", { name: "Sort by" });
    expect(
      within(selectList).getByRole("option", { name: "default" })
    ).toBeInTheDocument();
    expect(
      within(selectList).getByRole("option", { name: "Last name ascending" })
    ).toBeInTheDocument();
    expect(
      within(selectList).getByRole("option", { name: "Last name descending" })
    ).toBeInTheDocument();
  });

  test("handles search", async () => {
    const user = userEvent.setup();
    render(<Controls />);
    const input = screen.getByRole("textbox", { name: "Search a patient" });
    await user.type(input, "hello");
    expect(mockRouter.asPath).toMatch("search=hello");
  });

  test("handles sort", async () => {
    const user = userEvent.setup();
    render(<Controls />);
    const selectList = screen.getByRole("combobox", { name: "Sort by" });
    await user.selectOptions(selectList, "ascending");
    expect(mockRouter.asPath).toMatch("order=ascending");
  });
});
