import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Home } from "./Home";
import { AuthContext } from "./AuthContext";
import { MemoryRouter } from 'react-router-dom';

describe("Home Component", () => {
  const mockHandleLogin = jest.fn();
  const mockHandleLogout = jest.fn();
  const mockSetUsername = jest.fn();

  // Render the Home component with given context values
  const renderHome = (isLoggedIn, username = "") =>
    render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            isLoggedIn,
            username,
            handleLogin: mockHandleLogin,
            handleLogout: mockHandleLogout,
            setUsername: mockSetUsername,
          }}
        >
          <Home />
        </AuthContext.Provider>
      </MemoryRouter>
    );

  it("renders the login form when not logged in", () => {
    renderHome(false);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("shows the greeting and top results link when logged in", () => {
    renderHome(true, "test");

    expect(screen.getByText("Hello, test!")).toBeInTheDocument();
    expect(screen.getByText("Top results")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls handleLogin on successful login", async () => {
    // Mock the fetch response for successful login
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: "dummy-token" })
      })
    );

    renderHome(false);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "test" },
    });

    fireEvent.click(screen.getByText("Login"));

    // Use waitFor to handle async assertions
    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalled();
    });
  });

  it("calls handleLogout when logout button is clicked", () => {
    renderHome(true, "test");

    fireEvent.click(screen.getByText("Logout"));

    expect(mockHandleLogout).toHaveBeenCalled();
  });
});
