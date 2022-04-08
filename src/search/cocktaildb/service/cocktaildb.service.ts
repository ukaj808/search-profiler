import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { forkJoin, lastValueFrom, map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Cache } from 'cache-manager';

import { CocktailResults } from '../model/cocktail.model';

@Injectable()
export class CocktailDbService {
  search_path = '/api/json/v1/1/search.php';
  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async search(str: string, category?: string): Promise<CocktailResults> {
    const key: string = [str, category].join('#');
    let value: CocktailResults = await this.cacheManager.get(key);

    if (value != null) return Promise.resolve(value);

    let cocktailResult: Observable<CocktailResults>;

    switch (category) {
      case 'name':
        cocktailResult = this.searchByCocktailName(str).pipe(
          map((res) => {
            return res.data;
          }),
        );
        break;
      case 'ingredient':
        cocktailResult = this.searchByIngredientName(str).pipe(
          map((res) => {
            return res.data;
          }),
        );
        break;
      default:
        cocktailResult = forkJoin([
          this.searchByCocktailName(str),
          this.searchByIngredientName(str),
        ]).pipe(
          map((arr) => {
            return arr.map((value) => {
              return value.data;
            });
          }),
          map((arr) => {
            return arr.reduce((a, b) => {
              return Object.assign(a, b);
            });
          }),
        );
        break;
    }

    value = await lastValueFrom(cocktailResult);

    await this.cacheManager.set(key, value, { ttl: 600 }); // 10 minutes

    return Promise.resolve(value);
  }

  private searchByCocktailName(
    str: string,
  ): Observable<AxiosResponse<CocktailResults>> {
    return this.httpService.get(
      process.env.COCKTAIL_DB_URI + this.search_path,
      {
        params: { s: str },
      },
    );
  }

  private searchByIngredientName(
    str: string,
  ): Observable<AxiosResponse<CocktailResults>> {
    return this.httpService.get(
      process.env.COCKTAIL_DB_URI + this.search_path,
      {
        params: { i: str },
      },
    );
  }
}
