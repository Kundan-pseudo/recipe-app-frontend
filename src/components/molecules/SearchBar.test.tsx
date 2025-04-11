import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { recipeService } from "../../services/api";

// Mock the recipeService
jest.mock("../../services/api", () => ({
  recipeService: {
    searchRecipes: jest.fn(),
  },
}));

describe("SearchBar Component", () => {
  const mockOnSelectRecipe = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the search input", () => {
    render(<SearchBar onSelectRecipe={mockOnSelectRecipe} />);
    const searchInput = screen.getByPlaceholderText(/search for recipes/i);
    expect(searchInput).toBeInTheDocument();
  });

  it("shows loading spinner when searching", async () => {
    // Mock the API call to delay
    (recipeService.searchRecipes as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve([]), 100))
    );

    render(<SearchBar onSelectRecipe={mockOnSelectRecipe} />);

    const searchInput = screen.getByPlaceholderText(/search for recipes/i);
    fireEvent.change(searchInput, { target: { value: "chicken" } });

    // Check if loading spinner appears
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();

    // Wait for the API call to complete
    await waitFor(() => {
      expect(spinner).not.toBeInTheDocument();
    });
  });

  it("displays search results when API returns data", async () => {
    const mockResults = [
      { id: 1, name: "Chicken Curry", cuisine: "Indian" },
      { id: 2, name: "Chicken Soup", cuisine: "American" },
    ];

    (recipeService.searchRecipes as jest.Mock).mockResolvedValue(mockResults);

    render(<SearchBar onSelectRecipe={mockOnSelectRecipe} />);

    const searchInput = screen.getByPlaceholderText(/search for recipes/i);
    fireEvent.change(searchInput, { target: { value: "chicken" } });

    // Wait for first result to appear
    await waitFor(() => {
      expect(screen.getByText("Chicken Curry")).toBeInTheDocument();
    });

    // Check for second result
    expect(screen.getByText("Chicken Soup")).toBeInTheDocument();
  });

  it("calls onSelectRecipe when a result is clicked", async () => {
    const mockResults = [{ id: 1, name: "Chicken Curry", cuisine: "Indian" }];

    (recipeService.searchRecipes as jest.Mock).mockResolvedValue(mockResults);

    render(<SearchBar onSelectRecipe={mockOnSelectRecipe} />);

    const searchInput = screen.getByPlaceholderText(/search for recipes/i);
    fireEvent.change(searchInput, { target: { value: "chicken" } });

    // Wait for result to appear
    await waitFor(() => {
      expect(screen.getByText("Chicken Curry")).toBeInTheDocument();
    });

    // Click on the result
    const resultItem = screen.getByText("Chicken Curry");
    fireEvent.click(resultItem);

    // Check if onSelectRecipe was called with the correct recipe
    expect(mockOnSelectRecipe).toHaveBeenCalledWith(mockResults[0]);
  });
});
