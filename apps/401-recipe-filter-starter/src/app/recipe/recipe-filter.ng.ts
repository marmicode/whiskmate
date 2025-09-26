import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeFilterCriteria } from './recipe-filter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-filter',
  imports: [ReactiveFormsModule],
  template: ` &lt;🚧 wm-recipe-filter&gt; `,
})
export class RecipeFilter {
  filterChange = output<RecipeFilterCriteria>();
}
