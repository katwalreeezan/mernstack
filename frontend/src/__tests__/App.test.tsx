import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import App from "../App";

test("test 1", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const buttonEl = screen.getByRole("button", { name: "Hello" });
  expect(buttonEl).toBeInTheDocument();
});
