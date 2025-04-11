import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import SearchBar from "../molecules/SearchBar";
import { RecipeSearchResult } from "../../types/Recipe";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleRecipeSelect = (recipe: RecipeSearchResult) => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header">
      <Container>
        <Navbar.Brand href="/" className="brand">
          Recipe Finder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <SearchBar onSelectRecipe={handleRecipeSelect} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
