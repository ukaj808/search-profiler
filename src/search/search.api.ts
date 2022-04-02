import { Drink } from './cocktaildb/model/drink.model';
import { Ingredient } from './cocktaildb/model/ingredient.model';

export interface CocktailResult {
  drinks?: Drink[];
  ingredients?: Ingredient[];
}

export interface SearchResults {
  profileId: string;
  searchItems?: SearchItem[];
}

export interface SearchItem {
  category: string;
  items: any[];
}

export interface Filter {
  category: string;
  values: Map<string, string>;
}

export interface SearchRequest {
  searchStr: string;
  type: string;
  category?: string;
  profileId?: string;
}

// Our APIS drink model for much cleaner mappings; needed for filtering.
export interface SearchDrink {
  id: string;
  name: string;
  category: string;
  ingredients: string[];
  glass: string;
  hasAlcohol: string;
  thumbnailSource: string;
  imageSource: string;
  englishInstructions: string;
}

// Our APIS ingredient model for much cleaner mappings; needed for filtering.
export interface SearchIngredient {
  id: string;
  name: string;
  abv: number;
  hasAlcohol: string;
}
