import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <Container className="home-page">
      <Row className="hero-section">
        <Col md={8} className="mx-auto text-center">
          <h1 className="hero-title">Discover Delicious Recipes</h1>
          <p className="hero-subtitle">
            Search for recipes by name or cuisine and explore a world of
            culinary delights.
          </p>
          <Link to="/search">
            <Button variant="primary" size="lg" className="search-button">
              Start Exploring
            </Button>
          </Link>
        </Col>
      </Row>

      <Row className="features-section">
        <Col md={4}>
          <Card className="feature-card">
            <Card.Body>
              <Card.Title>Search by Name</Card.Title>
              <Card.Text>
                Find your favorite recipes by searching for their names. Our
                typeahead feature makes it easy to discover recipes as you type.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="feature-card">
            <Card.Body>
              <Card.Title>Search by Cuisine</Card.Title>
              <Card.Text>
                Explore recipes from different cuisines around the world. From
                Italian to Indian, find the perfect dish for any occasion.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="feature-card">
            <Card.Body>
              <Card.Title>Detailed Instructions</Card.Title>
              <Card.Text>
                Get step-by-step instructions, ingredient lists, and helpful
                tips to create delicious meals in your own kitchen.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
