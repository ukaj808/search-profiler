import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { forkJoin, map, Observable, reduce } from 'rxjs';
import { AxiosResponse } from 'axios';

import { CocktailResults } from './model/cocktail.model';

export const search_path = '/api/json/v1/1/search.php';

@Injectable()
export class CocktailDbService {
  constructor(private httpService: HttpService) {}

  search(str: string, category?: string): Observable<CocktailResults> {
    switch (category) {
      case 'name':
        return this.searchByCocktailName(str).pipe(
          map((res) => {
            return res.data;
          }),
        );
      case 'ingredient':
        return this.searchByIngredientName(str).pipe(
          map((res) => {
            return res.data;
          }),
        );
      default:
        return forkJoin([
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
    }
  }

  private searchByCocktailName(
    str: string,
  ): Observable<AxiosResponse<CocktailResults>> {
    return this.httpService.get(process.env.COCKTAIL_DB_URI + search_path, {
      params: { s: str },
    });
  }

  private searchByIngredientName(
    str: string,
  ): Observable<AxiosResponse<CocktailResults>> {
    return this.httpService.get(process.env.COCKTAIL_DB_URI + search_path, {
      params: { i: str },
    });
  }
}
