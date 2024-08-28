import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NewGame } from "./NewGame";
import { SingleCard } from "./SingleCard";
import "@testing-library/jest-dom/extend-expect";

describe("NewGame Component", () => {
  it("renders character selection screen initially", () => {
    render(<NewGame />);
    expect(screen.getByText("Choose your character:")).toBeInTheDocument();
    expect(screen.getByAltText("robot")).toBeInTheDocument();
    expect(screen.getByAltText("human")).toBeInTheDocument();
  });

  it("starts the game as human and renders the game screen", async () => {
    render(<NewGame />);

    fireEvent.click(screen.getByAltText("human"));

    await waitFor(() => {
      expect(screen.getByText("FIGHT Human!")).toBeInTheDocument();
    });

    expect(screen.getByText("You")).toBeInTheDocument();
    expect(screen.getByText("Robot")).toBeInTheDocument();
    expect(screen.getByText("Total Attack: 0")).toBeInTheDocument();
  });

  it("starts the game as robot and renders the game screen", async () => {
    render(<NewGame />);

    fireEvent.click(screen.getByAltText("robot"));

    await waitFor(() => {
      expect(
        screen.getByText("01100110 01101001 01100111 01101000 01110100")
      ).toBeInTheDocument();
    });

    expect(screen.getByText("You")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Total Attack: 0")).toBeInTheDocument();
  });

  it("calls onClick when the card is clicked", () => {
    const mockOnClick = jest.fn();

    // Example card data
    const badLuck = {
      name: "badLuck",
      powerAttack: 50,
      speedAttack: 2,
      luck: 1,
    };

    const middleLuck = {
      name: "middleLuck",
      powerAttack: 50,
      speedAttack: 2,
      luck: 5,
    };

    const goodLuck = {
      name: "goodLuck",
      powerAttack: 50,
      speedAttack: 2,
      luck: 8,
    };

    render(<SingleCard card={badLuck} onClick={mockOnClick} />);
    render(<SingleCard card={middleLuck} onClick={mockOnClick} />);
    render(<SingleCard card={goodLuck} onClick={mockOnClick} />);

    const cardElement = screen.getByText(/badLuck/i);
    fireEvent.click(cardElement);

    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Byte Wars/i)).toBeInTheDocument();
  });
});
