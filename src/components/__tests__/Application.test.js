import React from "react";

import { render, cleanup, waitForElement, act, fireEvent } from "@testing-library/react";

import Application from "components/Application";
import axios from "__mocks__/axios";

afterEach(cleanup);

describe("Application", () => {
  it("renders without crashing", () => {
    render(<Application />);
  });
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      console.log("allo?")
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    })

  });
})
