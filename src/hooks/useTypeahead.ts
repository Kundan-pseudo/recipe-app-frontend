import { useState, useEffect, useCallback } from 'react';
import { RecipeSearchResult } from '../types/Recipe';
import { recipeService } from '../services/api';

interface UseTypeaheadProps {
  minChars?: number;
  debounceMs?: number;
}

interface UseTypeaheadResult {
  query: string;
  setQuery: (query: string) => void;
  results: RecipeSearchResult[];
  isLoading: boolean;
  error: string | null;
  selectedItem: RecipeSearchResult | null;
  setSelectedItem: (item: RecipeSearchResult | null) => void;
}

export const useTypeahead = ({
  minChars = 3,
  debounceMs = 300,
}: UseTypeaheadProps = {}): UseTypeaheadResult => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<RecipeSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<RecipeSearchResult | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Fetch results when query changes
  useEffect(() => {
    // Clear previous timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Reset states when query is too short
    if (query.length < minChars) {
      setResults([]);
      setError(null);
      return;
    }

    // Set loading state
    setIsLoading(true);
    setError(null);

    // Create new timer
    const timer = setTimeout(async () => {
      try {
        const searchResults = await recipeService.searchRecipes(query);
        setResults(searchResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    setDebounceTimer(timer);

    // Cleanup timer on unmount or when query changes
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [query, minChars, debounceMs]);

  // Reset selected item when query changes
  useEffect(() => {
    setSelectedItem(null);
  }, [query]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    selectedItem,
    setSelectedItem,
  };
}; 