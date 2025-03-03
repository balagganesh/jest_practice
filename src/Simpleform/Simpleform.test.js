import { render, screen } from "@testing-library/react";
import SimpleForm from "./Simpleform.jsx";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("SimpleForm", () => {
  test("All fields exist", () => {
    render(<SimpleForm />);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password:")).toBeInTheDocument();

    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
  });

  test("Selects Gender radio button", () => {
    render(<SimpleForm />);
    const maleRadio = screen.getByLabelText("Male");

    userEvent.click(maleRadio);
    expect(maleRadio).toBeChecked();
  });

  test("Selects Interests checkbox", () => {
    render(<SimpleForm />);
    const musicCheckbox = screen.getByLabelText("Music");

    userEvent.click(musicCheckbox);
    expect(musicCheckbox).toBeChecked();
  });
});
