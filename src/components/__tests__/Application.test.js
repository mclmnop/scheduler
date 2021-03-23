import React from "react";

import { render, cleanup, waitForElement, getByText, act, fireEvent, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, getByTestId } from "@testing-library/react";

import Application from "components/Application";
import axios from "__mocks__/axios";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      console.log("allo?")
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    })
  });
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
/*     const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      console.log("allo?")
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    }) */
  
      const { container } = render(<Application/>)
      //console.log('Before', prettyDOM(appointments))
      
      await waitForElement(() => getByText(container,"Archie Cohen"))
      const appointments = getAllByTestId(container, "appointment")
      const appointment = getAllByTestId(container, "appointment")[0]

     
      console.log('After', prettyDOM(appointment))
      fireEvent.click(getByAltText(appointment, "Add"));
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones"}
      })
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
      fireEvent.click(getByText(appointment, "Save"))



  });
})
