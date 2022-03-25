import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {Observable} from "rxjs";
import {AxiosResponse} from "axios";
import {Drink} from "./model/drink.model";
import {Ingredient} from "./model/ingredient.model";

export const search_path = "/api/json/v1/1/search.php"

@Injectable()
export class CocktailDbService {
    constructor(private httpService: HttpService) {}

    searchByCocktailName(str: string): Observable<AxiosResponse<Drink[]>> {
        return this.httpService.get(process.env.COCKTAIL_DB_URI + search_path, {
            params: {"s": str}
        })
    }

    searchByIngredientName(str: string): Observable<AxiosResponse<Ingredient[]>> {
        return this.httpService.get(process.env.COCKTAIL_DB_URI + search_path, {
            params: {"i": str}
        })
    }

}
