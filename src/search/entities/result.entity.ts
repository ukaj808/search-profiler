import {Ingredient} from "../cocktaildb/model/ingredient.model";
import {Drink} from "../cocktaildb/model/drink.model";

export interface CocktailResult {

    drinks?: Drink[];
    ingredients?: Ingredient[];

}
