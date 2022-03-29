import { Injectable } from '@nestjs/common';
import { CocktailResults } from './model/cocktail.model';
import {SearchResults} from "../search.api";

export const search_path = '/api/json/v1/1/search.php';

@Injectable()
export class CocktailDbMapper {
  processCocktailSearchResults(
    profileId: string,
    results: CocktailResults,
  ): SearchResults {
    return {
      profileId: profileId,
      searchItems: [
        {
          category: "drinks",
          items: results.drinks
        },
        {
          category: "ingredients",
          items: results.ingredients
        }
      ]
    };
  }
}
