import React from "react";

import { render, cleanup, waitForElement, waitForElementToBeRemoved, getByText, act, fireEvent, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, getByTestId, queryByTestId, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";
import axios from "__mocks__/axios";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    })
  });
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

      const { container, debug} = render(<Application/>)
      
      await waitForElement(() => getByText(container,"Archie Cohen"))
      const appointments = getAllByTestId(container, "appointment")
      const appointment = appointments[0]
      
      fireEvent.click(getByAltText(appointment, "Add"));

      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones"}
      });

      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
      fireEvent.click(getByText(appointment, "Save"));
      expect(getByText(container, "saving")).toBeInTheDocument();

      await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

      const day = getAllByTestId(container, "day")
        .find(day => queryByText(day, "Monday"))
      expect(getByText(day, "no spots remaining")).toBeInTheDocument()
  });
  it("loads data, cancel an interview and increases the spots remaining for the first day by 1", async () => {

    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the first appointment.
     const appointmentToDelete = getAllByTestId(container, "appointment")
      .find(appointment => queryByText(appointment, "Archie Cohen"))

      fireEvent.click(queryByAltText(appointmentToDelete, "Delete"));
      
      
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointmentToDelete, "Do you really want to delete?")).toBeInTheDocument();
    
    // 5. Click the "Confirm" button on the appointment.
    fireEvent.click(getByText(appointmentToDelete, "Confirm"));
    
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(container, "Deleting")).toBeInTheDocument();
    
    // 7. Wait until the element with the add button is displayed.
    await waitForElement(() => getByAltText(appointmentToDelete, "Add"));
    
    // 8 . Check that the DayListItem with the text "Monday" has the text "2 spots remaining".
    const day = getAllByTestId(container, "day")
      .find(day => queryByText(day, "Monday"))
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument()
  });
})
