import { CocktailResult } from './result.entity';

export interface SearchResult {
  profileId: string;

  cocktailResults?: CocktailResult;

  beerResults?: any;
}
