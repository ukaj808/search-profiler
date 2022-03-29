import {Drink} from "./cocktaildb/model/drink.model";
import {Ingredient} from "./cocktaildb/model/ingredient.model";

export interface CocktailResult {
    drinks?: Drink[];
    ingredients?: Ingredient[];
}

export interface SearchResults {

    profileId: string;
    searchItems?: SearchItem[];

}

export interface SearchItem {
    category: string;
    items: any[];
}


export interface SearchRequest {
    searchStr: string;
    type: string;
    category?: string;
    profileId?: string;
}
