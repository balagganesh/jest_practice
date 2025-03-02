import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { jest } from "@jest/globals";
import store from "./Store/Store";
import App from "./App";
import React from "react";

// Mocking the entire assets module
jest.mock('./assets/Assets', () => ({
  assets: {
    bread: 'mock-image',
    butter: 'mock-image',
    cheese: 'mock-image',
    milk: 'mock-image',
    Soup: 'mock-image',
  }
}));

const renderWithRedux = (component) =>
  render(<Provider store={store}>{component}</Provider>);

test("renders product list", () => {
  renderWithRedux(<App />);
  expect(screen.getByText("Products")).toBeInTheDocument();
});

test("adds item to cart", async () => {
  renderWithRedux(<App />);
  const addButton = screen.getAllByText(/Add to Cart/i)[0];

  fireEvent.click(addButton);
  
  await waitFor(() =>
    expect(screen.getByText("Quantity: 1")).toBeInTheDocument()
  );
});

test("removes item from cart", async () => {
  renderWithRedux(<App />);
  const addButton = screen.getAllByText(/Add to Cart/i)[0];

  fireEvent.click(addButton);
  const removeButton = screen.getByText("Remove");
  fireEvent.click(removeButton);

  await waitFor(() =>
    expect(screen.queryByText("Quantity: 1")).not.toBeInTheDocument()
  );
});

test("updates total price", async () => {
  renderWithRedux(<App />);
  const addButton = screen.getAllByText(/Add to Cart/i)[0];

  fireEvent.click(addButton);
  
  await waitFor(() =>
    expect(screen.getByText(/Subtotal: £/)).toBeInTheDocument()
  );
});
