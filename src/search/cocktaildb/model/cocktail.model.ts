import { Drink } from './drink.model';
import { Ingredient } from './ingredient.model';

export interface CocktailResults {
  drinks?: Drink[];
  ingredients?: Ingredient[];
}
