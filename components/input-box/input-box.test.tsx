import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputBox from "./input-box";

describe("InputBox", () => {
  test("displays a label and description", () => {
    render(
      <InputBox
        label="hello"
        description="hi there"
        onChange={() => null}
        name=""
      />
    );

    expect(
      screen.getByRole("textbox", { name: "hello", description: "hi there" })
    ).toBeInTheDocument();
  });

  test("displays a placeholder", () => {
    render(
      <InputBox
        label="what colour?"
        placeholder="e.g. red"
        onChange={() => null}
        name=""
      />
    );

    expect(screen.getByPlaceholderText("e.g. red")).toBeInTheDocument();
  });

  test("handles input change", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<InputBox label="hello" onChange={onChange} name="" />);

    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.keyboard("hi!");
    expect(onChange).toHaveBeenCalledTimes(3);
  });
});
