import { nanoid } from 'nanoid';

export interface RecipeData {
  name: string;
}

export interface Recipe extends RecipeData {
  id: string;
}
