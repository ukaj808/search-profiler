import { Injectable } from '@nestjs/common';
import { CocktailResults } from './model/cocktail.model';
import { SearchDrink, SearchIngredient, SearchResults } from '../search.api';
import { Drink } from './model/drink.model';
import { Ingredient } from './model/ingredient.model';

@Injectable()
export class CocktailDbMapper {
  private filterMappings: Map<string, Map<string, string[]>> = new Map([
    [
      'drinks',
      new Map([
        ['category', ['var1', 'var1', 'var1']],
        ['ingredient', ['var1', 'var1', 'var1']],
        ['glass', ['var1', 'var1', 'var1']],
      ]),
    ],
    [
      'ingredients',
      new Map([
        ['category', ['var1', 'var1', 'var1']],
        ['ingredient', ['var1', 'var1', 'var1']],
        ['glass', ['var1', 'var1', 'var1']],
      ]),
    ],
  ]);

  processCocktailSearchResults(
    profileId: string,
    results: CocktailResults,
  ): SearchResults {
    return {
      profileId: profileId,
      searchItems: [
        {
          category: 'drinks',
          items: this.buildSearchDrinks(results.drinks),
        },
        {
          category: 'ingredients',
          items: this.buildSearchIngredients(results.ingredients),
        },
      ],
    };
  }

  private buildSearchDrinks(drinks: Drink[]): SearchDrink[] {
    const result: SearchDrink[] = [];

    drinks?.map((drink) => {
      result.push({
        id: drink.idDrink,
        name: drink.strDrink,
        ingredients: Array.from(Object.entries(drink))
          .filter(([key, val]) => key.startsWith('strIngredient') && val)
          .map(([key, val]) => {
            return val as string;
          }),
        glass: drink.strGlass,
        category: drink.strCategory,
      });
    });

    return result;
  }

  private buildSearchIngredients(
    ingredients: Ingredient[],
  ): SearchIngredient[] {
    const result: SearchIngredient[] = [];

    ingredients?.map((ingredient) => {
      result.push({
        id: ingredient.idIngredient,
        name: ingredient.strIngredient,
        abv: ingredient.strABV,
      });
    });

    return result;
  }
}
