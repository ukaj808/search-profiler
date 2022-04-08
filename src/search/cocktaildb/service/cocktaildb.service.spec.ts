import 'jest-extended';
import Mock = jest.Mock;
import { HttpService } from '@nestjs/axios';
import { CocktailDbService } from './cocktaildb.service';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { CocktailResults } from '../model/cocktail.model';
import { AxiosResponse } from 'axios';
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';

describe('CocktailDbService', () => {
  let cocktailDbService: CocktailDbService;
  let httpServiceMock: HttpService;
  let cacheManager: any;

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
      imports: [CacheModule.register({})],
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
    cacheManager = module.get<any>(CACHE_MANAGER);
  });

  describe('search (with name as the category)', () => {
    it(
      'should only make one get call to the cocktail db api &' +
        ' ingredients list should be empty',
      async () => {
        await cocktailDbService.search('test', 'name');
        expect(httpServiceMock.get).toBeCalledTimes(1);
      },
    );
  });

  describe('search (with ingredient as the category)', () => {
    it(
      'should only make one get call to the cocktail db api & ' +
        'drinks list should be empty',
      async () => {
        await cocktailDbService.search('test', 'ingredient');
        expect(httpServiceMock.get).toBeCalledTimes(1);
      },
    );
  });

  describe('search (default all)', () => {
    it('should only make one get call to the cocktail db api', async () => {
      await cocktailDbService.search('test', 'all');
      expect(httpServiceMock.get).toBeCalledTimes(2);
    });
  });
});
