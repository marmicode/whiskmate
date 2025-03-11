import { toSignal } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipePreviewComponent } from './recipe-preview.component';
import { CatalogComponent } from '../shared/catalog.component';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  imports: [CatalogComponent, RecipePreviewComponent],
  template: `
    <wm-catalog>
      @for (recipe of recipes(); track recipe.id) {
        <wm-recipe-preview [recipe]="recipe" />
      }
    </wm-catalog>
  `,
})
export class RecipeSearchComponent {
  recipes = toSignal(inject(RecipeRepository).search());
}
