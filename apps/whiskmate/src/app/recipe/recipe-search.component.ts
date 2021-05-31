import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  template: `🚧 &lt;wm-recipe-search&gt;`,
})
export class RecipeSearchComponent {}

@NgModule({
  declarations: [RecipeSearchComponent],
  exports: [RecipeSearchComponent],
  imports: [CommonModule],
})
export class RecipeSearchModule {}
