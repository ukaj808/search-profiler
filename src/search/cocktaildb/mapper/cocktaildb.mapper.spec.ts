import 'jest-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { CocktailDbMapper } from './cocktaildb.mapper';
import { SearchResults } from '../../search.api';
import Mock = jest.Mock;

describe('CocktailDbMapper', () => {
  let cocktailDbMapper: CocktailDbMapper;

  beforeEach(async () => {
    const httpServiceMockedGetFunction: Mock<any, any> = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [CocktailDbMapper],
    }).compile();

    cocktailDbMapper = module.get<CocktailDbMapper>(CocktailDbMapper);
  });

  describe('processCocktailSearchResults', () => {
    it('should take cocktail results (cocktaildb api) and return search results (our api)', async () => {
      const results: SearchResults =
        cocktailDbMapper.processCocktailSearchResults('test', {
          drinks: [
            {
              idDrink: 'test',
              strDrink: 'test',
            },
          ],
          ingredients: [
            {
              idIngredient: 'test',
              strIngredient: 'test',
            },
          ],
        });

      expect(results).toBeDefined();
    });
  });

  describe('processCocktailSearchResults (bad responses)', () => {
    it('should not fail for null responses', async () => {
      const resultsNull: SearchResults =
        cocktailDbMapper.processCocktailSearchResults('test', null);
      const drinksAndIngredientsUndefined: SearchResults =
        cocktailDbMapper.processCocktailSearchResults('test', {
          drinks: undefined,
          ingredients: undefined,
        });

      expect(resultsNull).toBeDefined();
      expect(drinksAndIngredientsUndefined).toBeDefined();
    });
  });

  describe('processCocktailSearchResults ingredients mapping', () => {
    it(
      'search results should contain a cocktail with the same amount of ingredients as given +' +
        'by the api, through variables ',
      async () => {
        const results: SearchResults =
          cocktailDbMapper.processCocktailSearchResults('test', {
            drinks: [
              {
                strIngredient1: 'test',
                strIngredient2: 'test',
                strIngredient3: 'test',
              },
            ],
            ingredients: undefined,
          });

        expect(results.searchItems[0].items[0].ingredients).toBeDefined();
        expect(
          results.searchItems[0].items[0].ingredients.length === 3,
        ).toBeDefined();
      },
    );
  });
});
