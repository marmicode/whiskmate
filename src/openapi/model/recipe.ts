/**
 * Recipe
 * ...
 *
 * The version of the OpenAPI document: 1.0
 * Contact: kitchen@marmicode.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Ingredient } from './ingredient';
import { RecipeRequest } from './recipe-request';
import { RecipeAllOf } from './recipe-all-of';


export interface Recipe { 
    id: string;
    /**
     * Recipe\'s name
     */
    name: string;
    ingredients?: Array<Ingredient>;
}

