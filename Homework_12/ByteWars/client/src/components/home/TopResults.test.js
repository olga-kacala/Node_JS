import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { TopResults } from "./TopResults";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { totalAttack: 100, side: "human" },
          { totalAttack: 200, side: "robot" },
        ]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("fetches and displays top results", async () => {
  render(<TopResults />);

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/v1/topResults"
    );
  });

  await waitFor(() => {
    expect(
      screen.getByText(/Total Attack: 100, Side: human/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Total Attack: 200, Side: robot/)
    ).toBeInTheDocument();
  });
});
