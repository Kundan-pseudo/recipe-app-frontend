import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../components/molecules/SearchBar";
import { RecipeSearchResult } from "../types/Recipe";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";

const SearchPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRecipeSelect = (recipe: RecipeSearchResult) => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <Container className="search-page">
      <Row>
        <Col md={8} className="mx-auto">
          <div className="search-container">
            <h1 className="search-title">Find Your Perfect Recipe</h1>
            <p className="search-subtitle">
              Start typing to search for recipes by name or cuisine. Results
              will appear as you type.
            </p>
            <SearchBar onSelectRecipe={handleRecipeSelect} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;
