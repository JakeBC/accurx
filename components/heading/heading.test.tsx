import { render, screen } from "@testing-library/react";
import Heading from "./heading";

describe("Heading component", () => {
  test("provides a top level heading", () => {
    render(<Heading text="hi mum!!" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "hi mum!!"
    );
  });
});
