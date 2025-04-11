import React, { useState, useRef, useEffect } from "react";
import { Form, InputGroup, Spinner } from "react-bootstrap";
import { RecipeSearchResult } from "../../types/Recipe";
import { useTypeahead } from "../../hooks/useTypeahead";
import "./SearchBar.css";

interface SearchBarProps {
  onSelectRecipe: (recipe: RecipeSearchResult) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelectRecipe }) => {
  const {
    query,
    setQuery,
    results,
    isLoading,
    error,
    selectedItem,
    setSelectedItem,
  } = useTypeahead();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsDropdownVisible(true);
  };

  // Handle item selection
  const handleItemSelect = (recipe: RecipeSearchResult) => {
    setSelectedItem(recipe);
    setQuery(recipe.name);
    setIsDropdownVisible(false);
    onSelectRecipe(recipe);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsDropdownVisible(false);
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();

      if (!results.length) return;

      const currentIndex = selectedItem
        ? results.findIndex((item) => item.id === selectedItem.id)
        : -1;

      let newIndex;
      if (e.key === "ArrowDown") {
        newIndex = currentIndex < results.length - 1 ? currentIndex + 1 : 0;
      } else {
        newIndex = currentIndex > 0 ? currentIndex - 1 : results.length - 1;
      }

      setSelectedItem(results[newIndex]);
    } else if (e.key === "Enter" && selectedItem) {
      handleItemSelect(selectedItem);
    }
  };

  return (
    <div className="search-container" ref={searchRef}>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search for recipes by name or cuisine..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsDropdownVisible(true)}
          onKeyDown={handleKeyDown}
          aria-label="Recipe search"
        />
        {isLoading && (
          <InputGroup.Text>
            <Spinner animation="border" size="sm" />
          </InputGroup.Text>
        )}
      </InputGroup>

      {error && <div className="search-error">{error}</div>}

      {isDropdownVisible && results.length > 0 && (
        <div className="search-dropdown">
          {results.map((recipe) => (
            <div
              key={recipe.id}
              className={`search-item ${
                selectedItem?.id === recipe.id ? "selected" : ""
              }`}
              onClick={() => handleItemSelect(recipe)}
            >
              <div className="recipe-name">{recipe.name}</div>
              <div className="recipe-cuisine">{recipe.cuisine}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
