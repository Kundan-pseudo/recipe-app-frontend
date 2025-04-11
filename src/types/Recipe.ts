export interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  image?: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  difficulty?: string;
}

export interface RecipeSearchResult {
  id: number;
  name: string;
  cuisine: string;
  image?: string;
} 