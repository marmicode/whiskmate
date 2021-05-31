import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createRecipeFilter, RecipeFilter } from './recipe-filter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-filter',
  template: `<form [formGroup]="filterFormGroup">
    <input data-role="keywords-input" formControlName="keywords" type="text" />
    <input
      data-role="max-ingredient-count-input"
      formControlName="maxIngredientCount"
      type="number"
    />
    <input
      data-role="max-step-count-input"
      formControlName="maxStepCount"
      type="number"
    />
  </form>`,
})
export class RecipeFilterComponent {
  @Output() filterChange: Observable<RecipeFilter>;

  filterFormGroup = new FormGroup({
    keywords: new FormControl(),
    maxIngredientCount: new FormControl(),
    maxStepCount: new FormControl(),
  });

  constructor() {
    this.filterChange = this.filterFormGroup.valueChanges.pipe(
      map((value) => createRecipeFilter(value))
    );
  }
}

@NgModule({
  declarations: [RecipeFilterComponent],
  exports: [RecipeFilterComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class RecipeFilterModule {}
