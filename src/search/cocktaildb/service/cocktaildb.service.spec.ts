import 'jest-extended';
import Mock = jest.Mock;
import { HttpService } from '@nestjs/axios';
import { CocktailDbService } from './cocktaildb.service';
import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom, of } from 'rxjs';
import { CocktailResults } from '../model/cocktail.model';
import { AxiosResponse } from 'axios';

describe('CocktailDbService', () => {
  let cocktailDbService: CocktailDbService;
  let httpServiceMock: HttpService;

  beforeEach(async () => {
    const httpServiceMockedGetFunction: Mock<any, any> = jest.fn(
      (url: string, options) => {
        if (url.endsWith('search.php')) {
          if (options?.params['s'] != null) {
            const nameCocktailResults: AxiosResponse<CocktailResults> = {
              status: 200,
              statusText: 'SUCCESS',
              headers: null,
              config: null,
              data: {
                drinks: [
                  {
                    idDrink: 'test',
                    strDrink: 'test',
                  },
                ],
                ingredients: [],
              },
            };
            return of(nameCocktailResults);
          } else if (options?.params['i'] != null) {
            const ingredientResults: AxiosResponse<CocktailResults> = {
              status: 200,
              statusText: 'SUCCESS',
              headers: null,
              config: null,
              data: {
                drinks: [],
                ingredients: [
                  {
                    idIngredient: 'test',
                    strIngredient: 'test',
                  },
                ],
              },
            };
            return of(ingredientResults);
          }
        }
      },
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CocktailDbService,
        {
          provide: HttpService,
          useValue: {
            get: httpServiceMockedGetFunction,
          },
        },
      ],
    }).compile();

    cocktailDbService = module.get<CocktailDbService>(CocktailDbService);
    httpServiceMock = module.get<HttpService>(HttpService);
  });

  describe('search (with name as the category)', () => {
    it(
      'should only make one get call to the cocktail db api &' +
        ' ingredients list should be empty',
      async () => {
        const results: CocktailResults = await firstValueFrom(
          cocktailDbService.search('test', 'name'),
        );

        expect(httpServiceMock.get).toBeCalledTimes(1);
      },
    );
  });

  describe('search (with ingredient as the category)', () => {
    it(
      'should only make one get call to the cocktail db api & ' +
        'drinks list should be empty',
      async () => {
        const results: CocktailResults = await firstValueFrom(
          cocktailDbService.search('test', 'ingredient'),
        );

        expect(httpServiceMock.get).toBeCalledTimes(1);
      },
    );
  });

  describe('search (default all)', () => {
    it('should only make one get call to the cocktail db api', async () => {
      const results: CocktailResults = await firstValueFrom(
        cocktailDbService.search('test', 'all'),
      );

      expect(httpServiceMock.get).toBeCalledTimes(2);
    });
  });
});
