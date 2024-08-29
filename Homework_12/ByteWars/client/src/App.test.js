import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App Component", () => {
  it("renders the Header and Footer", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Check if Header and Footer are rendered
    expect(screen.getByRole("heading", { name: /Byte Wars/i })).toBeInTheDocument();
    expect(screen.getByText(/Created by:/i)).toBeInTheDocument();
  });

  it("renders the Home component by default (at root path)", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // Check if the Home component content is rendered
    expect(screen.getByText(/Welcome to Byte Wars!/i)).toBeInTheDocument(); // Adjust based on actual Home component content
  });

  it("renders the TopResults component when navigating to /TopResults", () => {
    render(
      <MemoryRouter initialEntries={["/TopResults"]}>
        <App />
      </MemoryRouter>
    );

    // Check if the TopResults component is rendered
    expect(screen.getByText(/Top 10 Results/i)).toBeInTheDocument();
  });

  it("navigates correctly between routes", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // Initially, Home should be rendered
    expect(screen.getByText(/Welcome to Byte Wars!/i)).toBeInTheDocument(); // Adjust based on actual Home component content

    // Navigate to TopResults (simulate navigation by changing the URL)
    screen.getByRole("link", { name: /TopResults/i }).click();

    // TopResults should now be rendered
    expect(screen.getByText(/Top 10 Results/i)).toBeInTheDocument();
  });
});
