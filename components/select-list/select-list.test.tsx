import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectList from "./select-list";

describe("SelectList", () => {
  test("displays a label, description and select options", () => {
    const onChange = jest.fn();

    render(
      <SelectList
        options={[{ name: "orange", value: 1 }]}
        label="fruit"
        description="fruit and stuff"
        onChange={onChange}
      />
    );

    const select = screen.getByRole("combobox", { name: "fruit" });
    expect(
      within(select).getByRole("option", { name: "orange" })
    ).toBeInTheDocument();
    expect(screen.getByText("fruit")).toBeInTheDocument();
    expect(screen.getByText("fruit and stuff")).toBeInTheDocument();
  });

  test("calls the change event handler", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <SelectList
        options={[{ name: "orange", value: 1 }]}
        label="fruit"
        description="fruit and stuff"
        onChange={onChange}
      />
    );

    expect(onChange).not.toHaveBeenCalled();

    const select = screen.getByRole("combobox", { name: "fruit" });
    await user.selectOptions(select, "orange");

    expect(onChange).toHaveBeenCalled();
  });
});
