import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  NgModule,
  Output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeFilter } from './recipe-filter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-filter',
  template: ` &lt;🚧 wm-recipe-filter&gt; `,
})
export class RecipeFilterComponent {
  @Output() filterChange = new EventEmitter<RecipeFilter>();
}

@NgModule({
  declarations: [RecipeFilterComponent],
  exports: [RecipeFilterComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class RecipeFilterModule {}
