import { render } from "@testing-library/react";
import Home from "./components/pages/Home";

test("2 * 2 equals 4.", () => {
  render(<Home />);
  expect(2 * 2).toBe(4);
});
