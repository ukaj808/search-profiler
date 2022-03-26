import {Injectable} from '@nestjs/common';
import {SearchResult} from "../entities/search-result.entity";
import {AxiosResponse} from "axios";
import {CocktailResults} from "./model/cocktail.model";

export const search_path = "/api/json/v1/1/search.php"

@Injectable()
export class CocktailDbMapper {

    processCocktailSearchResults(profileId: string, results: CocktailResults): SearchResult {
        return {
            profileId: profileId,
            cocktailResults: {
                drinks: results.drinks,
                ingredients: results.ingredients
            }
        }

    }

}
