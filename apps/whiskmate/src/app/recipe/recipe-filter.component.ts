import { outputFromObservable } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { createRecipeFilter } from './recipe-filter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
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
export class RecipeFilterComponent {
  filterFormGroup = new FormGroup({
    keywords: new FormControl(),
    maxIngredientCount: new FormControl(),
    maxStepCount: new FormControl(),
  });

  filterChange = outputFromObservable(
    this.filterFormGroup.valueChanges.pipe(
      map((value) => createRecipeFilter(value))
    )
  );
}
