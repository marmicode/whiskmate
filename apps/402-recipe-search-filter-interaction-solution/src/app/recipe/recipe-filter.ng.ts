import { ChangeDetectionStrategy, Component } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { createRecipeFilterCriteria } from './recipe-filter-criteria';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-filter',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="filterFormGroup">
      <input
        aria-label="Keywords"
        formControlName="keywords"
        placeholder="keywords"
        type="text"
      />
      <input
        aria-label="Max Ingredients"
        formControlName="maxIngredientCount"
        placeholder="max ingredients"
        type="number"
      />
      <input
        aria-label="Max Steps"
        formControlName="maxStepCount"
        placeholder="max steps"
        type="number"
      />
    </form>
  `,
  styles: [
    `
      :host {
        text-align: center;
      }
    `,
  ],
})
export class RecipeFilter {
  filterFormGroup = new FormGroup({
    keywords: new FormControl(),
    maxIngredientCount: new FormControl(),
    maxStepCount: new FormControl(),
  });

  filterChange = outputFromObservable(
    this.filterFormGroup.valueChanges.pipe(
      map((value) => createRecipeFilterCriteria(value)),
    ),
  );
}
