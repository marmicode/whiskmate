import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeFilter } from './recipe-filter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'wm-recipe-filter',
  imports: [ReactiveFormsModule],
  template: ` &lt;🚧 wm-recipe-filter&gt; `,
})
export class RecipeFilterComponent {
  filterChange = output<RecipeFilter>();
}
