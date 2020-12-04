import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  render(<CheckoutForm />);
  const formHeader = screen.queryByText(/checkout form/i);
  expect(formHeader).toBeInTheDocument();
});

test("form shows success message on submit with form details", async () => {
  render(<CheckoutForm />);

  const firstNameInput = screen.getByLabelText(/First Name:/i);
  const lastNameInput = screen.getByLabelText(/Last Name:/i);
  const addressInput = screen.getByLabelText(/Address:/i);
  const cityInput = screen.getByLabelText(/City:/i);
  const stateInput = screen.getByLabelText(/State:/i);
  const zipInput = screen.getByLabelText(/Zip:/i);

  fireEvent.change(firstNameInput, { target: { value: "Solomon" } });
  fireEvent.change(lastNameInput, { target: { value: "Zelenko" } });
  fireEvent.change(addressInput, {
    target: { value: "1234 Beaver-ly Hills" },
  });
  fireEvent.change(cityInput, { target: { value: "Los Angeles" } });
  fireEvent.change(stateInput, { target: { value: "CA" } });
  fireEvent.change(zipInput, { target: { value: "90888" } });

  expect(firstNameInput).toHaveValue("Solomon");
  expect(lastNameInput).toHaveValue("Zelenko");
  expect(addressInput).toHaveValue("1234 Beaver-ly Hills");
  expect(cityInput).toHaveValue("Los Angeles");
  expect(stateInput).toHaveValue("CA");
  expect(zipInput).toHaveValue("90888");

  const submitter = screen.getByRole("button");
  fireEvent.click(submitter);

  const newFirstName = await screen.findAllByText(/Solomon/i);
  expect(newFirstName).toBeTruthy();
  const newLastName = await screen.findAllByText(/Zelenko/i);
  expect(newLastName).toBeTruthy();
  const newAddress = await screen.findAllByText(/1234 Beaver-ly Hills/i);
  expect(newAddress).toBeTruthy();
  const newCity = await screen.findAllByText(/Los Angeles/i);
  expect(newCity).toBeTruthy();
  const newState = await screen.findAllByText(/CA/i);
  expect(newState).toBeTruthy();
  const newZip = await screen.findAllByText(/90888/i);
  expect(newZip).toBeTruthy();

  const message = await screen.findAllByText(
    /You have ordered some plants! Woo-hoo!/
  );
  expect(message).toBeTruthy();
});
