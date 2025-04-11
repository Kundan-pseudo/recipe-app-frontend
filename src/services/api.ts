import axios from 'axios';
import { Recipe, RecipeSearchResult } from '../types/Recipe';

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service for recipes
export const recipeService = {
  // Search recipes by name or cuisine
  searchRecipes: async (query: string): Promise<RecipeSearchResult[]> => {
    try {
      if (query.length < 3) {
        return [];
      }
      
      const response = await api.get<RecipeSearchResult[]>(`/recipes/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw new Error('Failed to search recipes. Please try again later.');
    }
  },

  // Get recipe details by ID
  getRecipeById: async (id: number): Promise<Recipe> => {
    try {
      const response = await api.get<Recipe>(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching recipe with ID ${id}:`, error);
      throw new Error('Failed to fetch recipe details. Please try again later.');
    }
  }
}; 