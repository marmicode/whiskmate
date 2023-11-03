import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  merge,
  mergeMap,
  Observable,
  Subject,
  tap,
} from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Recipe } from '../recipe/recipe';
import { MealRepository } from './meal-repository.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class MealPlanner {
  recipes$: Observable<Recipe[]>;

  private _mealRepository = inject(MealRepository);
  private _recipes$ = new BehaviorSubject<Recipe[]>([]);
  private _addRecipe$ = new Subject<Recipe>();

  constructor() {
    this.recipes$ = this._recipes$.asObservable();

    this._addRecipe$
      .pipe(
        mergeMap((recipe) =>
          this._mealRepository.addMeal(recipe).pipe(map(() => recipe))
        ),
        takeUntilDestroyed()
      )
      .subscribe((recipe) =>
        this._recipes$.next([...this._recipes$.value, recipe])
      );
  }

  addRecipe(recipe: Recipe) {
    if (!this._canAddRecipe({ recipe, recipes: this._recipes$.value })) {
      throw new Error(`Can't add recipe.`);
    }

    this._addRecipe$.next(recipe);
  }

  watchCanAddRecipe(recipe: Recipe): Observable<boolean> {
    return this._recipes$.pipe(
      map((recipes) => this._canAddRecipe({ recipe, recipes })),
      distinctUntilChanged()
    );
  }

  private _canAddRecipe({
    recipes,
    recipe,
  }: {
    recipes: Recipe[];
    recipe: Recipe;
  }) {
    return !recipes.find((_recipe) => _recipe.id === recipe.id);
  }
}
