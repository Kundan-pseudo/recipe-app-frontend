import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { Recipe } from "../../types/Recipe";
import { recipeService } from "../../services/api";
import "./RecipeDetail.css";

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await recipeService.getRecipeById(parseInt(id));
        setRecipe(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load recipe details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!recipe) {
    return (
      <Container className="my-5">
        <Alert variant="warning">Recipe not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="recipe-detail my-5">
      <Row>
        <Col md={6}>
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.name}
              className="recipe-image img-fluid rounded"
            />
          ) : (
            <div className="recipe-image-placeholder">
              <span>No image available</span>
            </div>
          )}
        </Col>
        <Col md={6}>
          <Card className="recipe-info">
            <Card.Body>
              <Card.Title className="recipe-title">{recipe.name}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                {recipe.cuisine} Cuisine
              </Card.Subtitle>

              {recipe.description && (
                <Card.Text className="recipe-description">
                  {recipe.description}
                </Card.Text>
              )}

              <div className="recipe-meta">
                {recipe.prepTime && (
                  <div className="meta-item">
                    <span className="meta-label">Prep Time:</span>
                    <span className="meta-value">{recipe.prepTime}</span>
                  </div>
                )}

                {recipe.cookTime && (
                  <div className="meta-item">
                    <span className="meta-label">Cook Time:</span>
                    <span className="meta-value">{recipe.cookTime}</span>
                  </div>
                )}

                {recipe.servings && (
                  <div className="meta-item">
                    <span className="meta-label">Servings:</span>
                    <span className="meta-value">{recipe.servings}</span>
                  </div>
                )}

                {recipe.difficulty && (
                  <div className="meta-item">
                    <span className="meta-label">Difficulty:</span>
                    <span className="meta-value">{recipe.difficulty}</span>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <Card className="ingredients-card">
              <Card.Header>Ingredients</Card.Header>
              <Card.Body>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={6}>
          {recipe.instructions && recipe.instructions.length > 0 && (
            <Card className="instructions-card">
              <Card.Header>Instructions</Card.Header>
              <Card.Body>
                <ol className="instructions-list">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeDetail;
