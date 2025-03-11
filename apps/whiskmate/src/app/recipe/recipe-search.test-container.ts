import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecipeSearchComponent } from './recipe-search.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search-test-container',
  imports: [RecipeSearchComponent],
  template: `<wm-recipe-search/>`,
})
export class RecipeSearchTestContainerComponent {}
